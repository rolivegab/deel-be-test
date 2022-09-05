import {
  Association,
  BelongsToGetAssociationMixin,
  CreationOptional,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
} from "@sequelize/core/types";
import { Sequelize } from "../exports/Sequelize";
import { dbService } from "../services/db.service";
import { ContractModel } from "./contract.model";

export class JobModel extends Sequelize.Model<
  InferAttributes<JobModel>,
  InferCreationAttributes<JobModel>
> {
  declare id: CreationOptional<string>;
  declare description: string;
  declare price: number;
  declare paid: CreationOptional<boolean>;
  declare paymentDate: CreationOptional<Date>;
  declare contractId: number;
  declare contract: NonAttribute<ContractModel>;

  declare getContract: BelongsToGetAssociationMixin<ContractModel>;

  declare static associations: {
    contract: Association<JobModel, ContractModel>;
  };
}
JobModel.init(
  {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false,
    },
    paid: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    paymentDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    contractId: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
  },
  {
    sequelize: dbService.connection,
    modelName: "Job",
  }
);
