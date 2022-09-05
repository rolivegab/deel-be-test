import { Op } from "@sequelize/core";
import { Request, Response } from "express";
import { ConflictException } from "../exceptions/Conflict.exception";
import { ForbiddenException } from "../exceptions/Forbidden.exception";
import { NotFoundException } from "../exceptions/NotFound.exception";
import { ContractModel } from "../models/contract.model";
import { JobModel } from "../models/job.model";
import { authorizationService } from "../services/authorization.service";
import { dbService } from "../services/db.service";
import { exceptionService } from "../services/exception.service";
import { profilesService } from "../services/profiles.service";

const MAX_DEPOSIT_PERCENTAGE = 0.25;

const deposit = async (req: Request, res: Response) => {
  try {
    const amount = Number(req.body.amount);
    const { clientId } = req.params;
    await dbService.connection.transaction(async (transaction) => {
      const profile = await authorizationService.checkProfile(req, transaction);
      const client = await profilesService.findByPk(
        Number(clientId),
        transaction
      );
      if (!client) {
        throw new NotFoundException("client not found");
      }
      if (profile.id !== client.id) {
        throw new ForbiddenException(
          "can't deposit in another client's account"
        );
      }
      const jobs = await JobModel.findAll({
        where: {
          paid: false,
        },
        include: {
          model: ContractModel,
          as: "contract",
          where: {
            [Op.or]: { clientId: profile.id },
            status: "in_progress",
          },
        },
        transaction,
      });
      const jobsPriceSum = jobs.reduce((prev, curr) => prev + curr.price, 0);
      const maxDeposit = jobsPriceSum * MAX_DEPOSIT_PERCENTAGE;
      if (amount > maxDeposit) {
        throw new ConflictException(
          `max depoist amount is ${maxDeposit.toFixed(2)}`
        );
      }
      client.balance = Number(client.balance) + amount;
      await client.save({ transaction });
      res.json(client);
    });
  } catch (error) {
    exceptionService.handleErrorResponse(error, res);
  }
};

export const balancesController = { deposit };
