import { Router } from "express";
import { userRoutes } from "./user.routes";
import { checkingAccountRoutes } from "./checkingAccount.routes";
import { transactionRoutes } from "./transaction.routes";
import { creditCardRoutes } from "./creditCard.routes";
import { categoryRoutes } from "./category.routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/checkingAccounts", checkingAccountRoutes);
routes.use("/transactions", transactionRoutes);
routes.use("/creditCards", creditCardRoutes)
routes.use("/categories", categoryRoutes)

export { routes };