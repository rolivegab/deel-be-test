import { Op } from "@sequelize/core";
import { Request, Response } from "express";
import { exceptionService } from "../services/exception.service";
import { jobsService } from "../services/jobs.service";

const bestProfession = async (req: Request, res: Response) => {
  try {
    const startDate = new Date(String(req.query.start));
    const endDate = new Date(String(req.query.end));
    const jobsByProfession = await jobsService.findBestProfessionInRange(
      startDate,
      endDate
    );
    res.json(jobsByProfession[0].contract.contractor.profession);
  } catch (error) {
    exceptionService.handleErrorResponse(error, res);
  }
};

const bestClients = async (req: Request, res: Response) => {
  try {
    const startDate = new Date(String(req.query.start));
    const endDate = new Date(String(req.query.end));
    const jobsByProfession = await jobsService.findBestProfessionInRange(
      startDate,
      endDate
    );
    res.json(jobsByProfession[0].contract.contractor.profession);
  } catch (error) {
    exceptionService.handleErrorResponse(error, res);
  }
};

export const adminController = { bestProfession, bestClients };
