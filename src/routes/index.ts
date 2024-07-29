import { Router } from "express";
import { userRoutes } from "./user.routes";
import { checkingAccountRoutes } from "./checkingAccount.routes";
import { transactionRoutes } from "./transaction.routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/checkingAccounts", checkingAccountRoutes);
routes.use("/transactions", transactionRoutes);

export { routes };