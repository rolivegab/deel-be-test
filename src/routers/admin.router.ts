import { Router } from "express";
import { adminController } from "../controllers/admin.controller";

export const adminRouter = Router()
  .get("/best-profession", adminController.bestProfession)
  .get("/best-clients", adminController.bestClients);
