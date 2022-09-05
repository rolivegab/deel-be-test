import { Router } from "express";
import { jobsController } from "../controllers/jobs.controller";

export const jobsRouter = Router()
  .get("/unpaid", jobsController.unpaid)
  .post("/:jobId/pay", jobsController.pay);
