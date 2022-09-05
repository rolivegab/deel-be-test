import { Router } from "express";
import { adminRouter } from "./admin.router";
import { balancesRouter } from "./balances.router";
import { contractsRouter } from "./contracts.router";
import { jobsRouter } from "./jobs.router";

export const mainRouter = Router()
  .use("/contracts", contractsRouter)
  .use("/jobs", jobsRouter)
  .use("/balances", balancesRouter)
  .use("/admin", adminRouter);
