import { Router } from "express";
import { CreateExpenseController } from "../modules/expenses/useCases/createExpense/CreateExpenseController";
import { GetExpenseByIdController } from "../modules/expenses/useCases/getExpenseById/getExpenseByIdController";
import { DeleteExpenseByIdController } from "../modules/expenses/useCases/deleteExpenseById/DeleteExpenseByIdController";
import { UpdateExpenseByIdController } from "../modules/expenses/useCases/updateExpenseById/updateExpenseByIdController";
import { ListAllExpensesByUserIdController } from "../modules/expenses/useCases/listAllExpensesByUserId/listAllExpensesByUserIdController";
import { VerifyToken } from "../middlewares/auth";

const createExpenseController = new CreateExpenseController();
const getExpenseByIdController = new GetExpenseByIdController();
const deleteExpenseByIdController = new DeleteExpenseByIdController();
const updateExpenseByIdController = new UpdateExpenseByIdController();
const listAllExpensesByUserIdController =
  new ListAllExpensesByUserIdController();
const verifyToken = new VerifyToken();

const expenseRoutes = Router();

expenseRoutes.post(
  "/create",
  verifyToken.handle,
  createExpenseController.handle
);
expenseRoutes.get("/:id", verifyToken.handle, getExpenseByIdController.handle);
expenseRoutes.get(
  "/user",
  verifyToken.handle,
  listAllExpensesByUserIdController.handle
);
expenseRoutes.delete(
  "/:id",
  verifyToken.handle,
  deleteExpenseByIdController.handle
);
expenseRoutes.put(
  "/:id",
  verifyToken.handle,
  updateExpenseByIdController.handle
);

export { expenseRoutes };
