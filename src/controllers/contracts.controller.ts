import { Request, Response } from "express";
import { authorizationService } from "../services/authorization.service";
import { contractsService } from "../services/contracts.service";
import { exceptionService } from "../services/exception.service";

const findByPk = async (req: Request, res: Response) => {
  try {
    const { contractId } = req.params;
    await authorizationService.checkProfile(req);
    const contract = await contractsService.findByPk(Number(contractId));
    res.json(contract);
  } catch (error) {
    exceptionService.handleErrorResponse(error, res);
  }
};

const findMany = async (req: Request, res: Response) => {
  try {
    const profile = await authorizationService.checkProfile(req);
    const contracts = await contractsService.findAllByProfileId(profile.id);
    res.json(contracts);
  } catch (error) {
    exceptionService.handleErrorResponse(error, res);
  }
};

export const contractsController = { findByPk, findMany };
