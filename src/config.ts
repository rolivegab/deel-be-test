import assert from "assert/strict";
import dotenv from "dotenv";
import { R } from "./exports/R";
dotenv.config();
const { POSTGRES_DB, POSTGRES_PASSWORD, PORT } = process.env;

export const config = { POSTGRES_DB, POSTGRES_PASSWORD, PORT };

R.keys(config).forEach((env) => {
  assert(config[env], `must set env ${env}`);
});
