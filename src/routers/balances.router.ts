import { Router } from "express";
import { balancesController } from "../controllers/balances.controller";

export const balancesRouter = Router().post(
  "/deposit/:clientId",
  balancesController.deposit
);
