import { Router } from "express";
import { CreateTransactionController } from "../modules/transactions/useCases/createTransaction/CreateTransactionController";
import { GetTransactionByIdController } from "../modules/transactions/useCases/getTransaction/GetTransactionByIdController";
import { DeleteTransactionByIdController } from "../modules/transactions/useCases/deleteTransaction/DeleteTransactioneByIdController";
import { UpdateTransactionByIdController } from "../modules/transactions/useCases/updateTransaction/UpdateTransactionByIdController";
import { ListAllTransactionsByUserIdController } from "../modules/transactions/useCases/listAllTransactions/ListAllTransactionsByUserIdController";
import { VerifyToken } from "../middlewares/auth";

const createTransactionController = new CreateTransactionController();
const getTransactionByIdController = new GetTransactionByIdController();
const deleteTransactionByIdController = new DeleteTransactionByIdController();
const updateTransactionByIdController = new UpdateTransactionByIdController();
const listAllTransactionsByUserIdController =
  new ListAllTransactionsByUserIdController();
const verifyToken = new VerifyToken();

const transactionRoutes = Router();

transactionRoutes.post(
  "/create",
  verifyToken.handle,
  createTransactionController.handle
);

transactionRoutes.get(
  "/list",
  verifyToken.handle,
  listAllTransactionsByUserIdController.handle
);

transactionRoutes.get(
  "/:id",
  verifyToken.handle,
  getTransactionByIdController.handle
);

transactionRoutes.delete(
  "/:id",
  verifyToken.handle,
  deleteTransactionByIdController.handle
);
transactionRoutes.put(
  "/:id",
  verifyToken.handle,
  updateTransactionByIdController.handle
);

export { transactionRoutes };
