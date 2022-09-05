import { Sequelize } from "@sequelize/core";
import { config } from "../config";

const connection = new Sequelize(
  `postgres://postgres:${config.POSTGRES_PASSWORD}@localhost:5432/${config.POSTGRES_DB}`
);

export const dbService = { connection };
