import { Router } from "express";
import { contractsController } from "../controllers/contracts.controller";

export const contractsRouter = Router()
  .get("/:contractId", contractsController.findByPk)
  .get("/", contractsController.findMany);
