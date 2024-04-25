import { Router } from "express";
import { CreateCheckingAccountController } from "../modules/checkingAccounts/useCases/createCheckingAccount/CreateCheckingAccountController"
import { GetCheckingAccountByUserIdController } from "../modules/checkingAccounts/useCases/getCheckingAccountsByUserId/GetCheckingAccountByUserIdController";
import { DeleteCheckingAccountByIdController } from "../modules/checkingAccounts/useCases/deleteCheckingAccountById/DeleteCheckingAccountByIdController";
import { UpdateCheckingAccountByIdController } from "../modules/checkingAccounts/useCases/updateCheckingAccountById/UpdateCheckingAccountByIdController";

const createCheckingAccountController = new CreateCheckingAccountController();
const getCheckingAccountByUserIdController = new GetCheckingAccountByUserIdController();
const deleteCheckingAccountByIdController = new DeleteCheckingAccountByIdController();
const updateCheckingAccountByIdController = new UpdateCheckingAccountByIdController();

const checkingAccountRoutes = Router();

checkingAccountRoutes.post("/create", createCheckingAccountController.handle);
checkingAccountRoutes.get("/:userId", getCheckingAccountByUserIdController.handle);
checkingAccountRoutes.delete("/:id", deleteCheckingAccountByIdController.handle);
checkingAccountRoutes.put("/:id", updateCheckingAccountByIdController.handle);

export { checkingAccountRoutes };