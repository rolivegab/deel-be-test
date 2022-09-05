import { Request } from "express";
import { UnauthorizedException } from "../exceptions/Unauthorized.exception";
import Sequelize from "@sequelize/core";
import { ProfileModel } from "../models/profile.model";

const checkProfile = async (
  req: Request,
  transaction?: Sequelize.Transaction
) => {
  const profileId = req.get("profile_id");
  if (!profileId) throw new UnauthorizedException("unauthorized");
  const profile = await ProfileModel.findOne({
    where: { id: profileId },
    transaction,
  });
  if (!profile) throw new UnauthorizedException("unauthorized");
  return profile;
};

export const authorizationService = { checkProfile };
