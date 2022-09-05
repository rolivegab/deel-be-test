import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "@sequelize/core/types";
import { Sequelize } from "../exports/Sequelize";
import { dbService } from "../services/db.service";

export enum ProfileType {
  CLIENT = "client",
  CONTRACTOR = "contractor",
}

export class ProfileModel extends Sequelize.Model<
  InferAttributes<ProfileModel>,
  InferCreationAttributes<ProfileModel>
> {
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare lastName: string;
  declare profession: string;
  declare balance: CreationOptional<number>;
  declare type: ProfileType;
}
ProfileModel.init(
  {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    profession: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    balance: {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: true,
    },
    type: {
      type: Sequelize.ENUM(...Object.values(ProfileType)),
      allowNull: true,
    },
  },
  {
    sequelize: dbService.connection,
    modelName: "Profile",
  }
);
