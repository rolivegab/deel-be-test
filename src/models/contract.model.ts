import {
  Association,
  CreationOptional,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
} from "@sequelize/core/types";
import Sequelize from "@sequelize/core";
import { dbService } from "../services/db.service";
import { JobModel } from "./job.model";
import { ProfileModel } from "./profile.model";

export enum ContractStatus {
  NEW = "new",
  IN_PROGRESS = "in_progress",
  TERMINATED = "terminated",
}

export class ContractModel extends Sequelize.Model<
  InferAttributes<ContractModel>,
  InferCreationAttributes<ContractModel>
> {
  declare id: CreationOptional<number>;
  declare terms: string;
  declare status: ContractStatus;
  declare clientId: number;
  declare contractorId: number;
  declare getJobs: HasManyGetAssociationsMixin<JobModel>;
  declare contractor: NonAttribute<ProfileModel>;

  declare static associations: {
    jobs: Association<ContractModel, JobModel>;
    contractor: Association<ContractModel, ProfileModel>;
  };
}
ContractModel.init(
  {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    terms: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM(...Object.values(ContractStatus)),
      allowNull: false,
    },
    clientId: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    contractorId: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
  },
  {
    sequelize: dbService.connection,
    modelName: "Contract",
  }
);
