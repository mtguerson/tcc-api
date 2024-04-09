import { Router } from "express";
import { userRoutes } from "./user.routes";
import { checkingAccountRoutes } from "./checkingAccount.routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/checkingAccounts", checkingAccountRoutes);

export { routes };