import { Request, Response } from "express";
import { ClientException } from "../exceptions/ClientException";
import { exceptionService } from "../services/exception.service";
import { jobsService } from "../services/jobs.service";
import { isValidDate } from "../utils/isValidDate";

const bestProfession = async (req: Request, res: Response) => {
  try {
    const startDate = new Date(String(req.query.start));
    const endDate = new Date(String(req.query.end));
    if (!isValidDate(startDate))
      throw new ClientException("invalid start input");
    if (!isValidDate(endDate)) throw new ClientException("invalid end input");
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
    const limit = Number(req.query.limit);
    if (!isValidDate(startDate))
      throw new ClientException("invalid start input");
    if (!isValidDate(endDate)) throw new ClientException("invalid end input");
    const bestClients = await jobsService.findBestClientsInRange(
      startDate,
      endDate,
      limit
    );
    res.json(bestClients);
  } catch (error) {
    exceptionService.handleErrorResponse(error, res);
  }
};

export const adminController = { bestProfession, bestClients };
