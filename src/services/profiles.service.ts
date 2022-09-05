import Sequelize from "@sequelize/core";
import { ProfileModel } from "../models/profile.model";

const findByPk = async (
  profileId: number,
  transaction?: Sequelize.Transaction
) => {
  return await ProfileModel.findByPk(profileId, { transaction });
};

export const profilesService = { findByPk };
