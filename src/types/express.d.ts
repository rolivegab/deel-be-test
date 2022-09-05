// import type { Request } from "express";
// import { ProfileModel } from "../models/profile.model";

declare namespace Express {
  interface Request {
    profile?: import("../models/profile.model").ProfileModel;
  }
}
