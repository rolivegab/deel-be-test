import Express from "express";
import { mainRouter } from "./routers/main.router";
import { associateRelations } from "./services/model.service";
export const getApp = () => {
  const app = Express();
  app.use(Express.json());
  app.use(mainRouter);
  associateRelations();
  return app;
};
