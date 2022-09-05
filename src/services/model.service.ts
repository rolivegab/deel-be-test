import { ContractModel } from "../models/contract.model";
import { JobModel } from "../models/job.model";
import { ProfileModel } from "../models/profile.model";

export const associateRelations = () => {
  ContractModel.belongsTo(ProfileModel, {
    as: "contractor",
    foreignKey: "contractorId",
  });
  ContractModel.belongsTo(ProfileModel, {
    as: "client",
    foreignKey: "clientId",
  });
  ContractModel.hasMany(JobModel, { foreignKey: "contractId", as: "jobs" });
  JobModel.belongsTo(ContractModel, {
    foreignKey: "contractId",
    as: "contract",
  });
  ProfileModel.hasMany(ContractModel, {
    as: "contractor",
    foreignKey: "contractorId",
  });
  ProfileModel.hasMany(ContractModel, { as: "client", foreignKey: "clientId" });
};
