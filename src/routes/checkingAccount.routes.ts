import { Router } from "express";
import { CreateCheckingAccountController } from "../modules/checkingAccounts/useCases/createCheckingAccount/CreateCheckingAccountController";
import { GetCheckingAccountByUserIdController } from "../modules/checkingAccounts/useCases/getCheckingAccountsByUserId/GetCheckingAccountByUserIdController";
import { DeleteCheckingAccountByIdController } from "../modules/checkingAccounts/useCases/deleteCheckingAccountById/DeleteCheckingAccountByIdController";
import { UpdateCheckingAccountByIdController } from "../modules/checkingAccounts/useCases/updateCheckingAccountById/UpdateCheckingAccountByIdController";
import { VerifyToken } from "../middlewares/auth";

const createCheckingAccountController = new CreateCheckingAccountController();
const getCheckingAccountByUserIdController =
  new GetCheckingAccountByUserIdController();
const deleteCheckingAccountByIdController =
  new DeleteCheckingAccountByIdController();
const updateCheckingAccountByIdController =
  new UpdateCheckingAccountByIdController();
const verifyToken = new VerifyToken();
const checkingAccountRoutes = Router();

checkingAccountRoutes.post(
  "/create",
  verifyToken.handle,
  createCheckingAccountController.handle
);
checkingAccountRoutes.get(
  "/:id",
  verifyToken.handle,
  getCheckingAccountByUserIdController.handle
);
checkingAccountRoutes.delete(
  "/:id",
  verifyToken.handle,
  deleteCheckingAccountByIdController.handle
);
checkingAccountRoutes.put(
  "/:id",
  verifyToken.handle,
  updateCheckingAccountByIdController.handle
);

export { checkingAccountRoutes };
