import { Request, Response } from "express";
import { ConflictException } from "../exceptions/Conflict.exception";
import { ForbiddenException as ForbiddenException } from "../exceptions/Forbidden.exception";
import { NotFoundException } from "../exceptions/NotFound.exception";
import { ContractStatus } from "../models/contract.model";
import { authorizationService } from "../services/authorization.service";
import { dbService } from "../services/db.service";
import { exceptionService } from "../services/exception.service";
import { jobsService } from "../services/jobs.service";

const unpaid = async (req: Request, res: Response) => {
  try {
    const { id: profileId } = await authorizationService.checkProfile(req);
    const unpaidJobs = jobsService.findAllByProfileIdAndStatus(
      profileId,
      ContractStatus.IN_PROGRESS
    );
    res.json(unpaidJobs);
  } catch (error) {
    exceptionService.handleErrorResponse(error, res);
  }
};

const pay = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;
    const job = await dbService.connection.transaction(async (transaction) => {
      const profile = await authorizationService.checkProfile(req, transaction);
      const job = await jobsService.findOneByIdAndPaid(
        Number(jobId),
        false,
        transaction
      );
      if (!job) throw new NotFoundException("job not found");
      const contract = await job.getContract({ transaction });
      if (profile.id !== contract.clientId) {
        throw new ForbiddenException(
          "you can't pay for another client's contract"
        );
      }
      if (!profile) throw new NotFoundException("job not found");
      if (Number(profile.balance) >= Number(job.price)) {
        profile.balance -= job.price;
        await profile.save({ transaction });
        job.paid = true;
        await job.save({ transaction });
      } else {
        throw new ConflictException("client doesn't have sufficient funds");
      }
      return job;
    });
    res.json(job);
  } catch (error) {
    exceptionService.handleErrorResponse(error, res);
  }
};

export const jobsController = { unpaid, pay };
