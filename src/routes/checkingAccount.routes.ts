import { Router } from "express";
import { CreateCheckingAccountController } from "../modules/checkingAccounts/useCases/createCheckingAccount/CreateCheckingAccountController"
import { GetCheckingAccountByUserIdController } from "../modules/checkingAccounts/useCases/getCheckingAccountsByUserId/GetCheckingAccountByUserIdController";

const createCheckingAccountController = new CreateCheckingAccountController();
const getCheckingAccountByUserIdController = new GetCheckingAccountByUserIdController();

const checkingAccountRoutes = Router();

checkingAccountRoutes.post("/create", createCheckingAccountController.handle);
checkingAccountRoutes.get("/:userId", getCheckingAccountByUserIdController.handle);

export { checkingAccountRoutes };