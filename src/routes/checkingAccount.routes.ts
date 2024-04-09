import { Router } from "express";
import { CreateCheckingAccountController } from "../modules/checkingAccounts/useCases/createCheckingAccount/CreateCheckingAccountController"

const createCheckingAccountController = new CreateCheckingAccountController();

const checkingAccountRoutes = Router();

checkingAccountRoutes.post("/create", createCheckingAccountController.handle);

export { checkingAccountRoutes };