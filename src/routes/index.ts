import { Router } from "express";
import { userRoutes } from "./user.routes";
import { checkingAccountRoutes } from "./checkingAccount.routes";
import { expenseRoutes } from "./expense.routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/checkingAccounts", checkingAccountRoutes);
routes.use("/expenses", expenseRoutes);

export { routes };