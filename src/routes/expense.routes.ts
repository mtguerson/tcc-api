import { Router } from "express";
import { CreateExpenseController } from "../modules/expenses/useCases/createExpense/CreateExpenseController";
import { GetExpenseByIdController } from "../modules/expenses/useCases/getExpenseById/GetExpenseByIdController";
import { DeleteExpenseByIdController } from "../modules/expenses/useCases/deleteExpenseById/DeleteExpenseByIdController";
import { UpdateExpenseByIdController } from "../modules/expenses/useCases/updateExpenseById/UpdateExpenseByIdController";
import { ListAllExpensesByUserIdController } from "../modules/expenses/useCases/listAllExpensesByUserId/listAllExpensesByUserIdController";

const createExpenseController = new CreateExpenseController();
const getExpenseByIdController = new GetExpenseByIdController();
const deleteExpenseByIdController = new DeleteExpenseByIdController();
const updateExpenseByIdController = new UpdateExpenseByIdController();
const listAllExpensesByUserIdController =
  new ListAllExpensesByUserIdController();

const expenseRoutes = Router();

expenseRoutes.post("/create", createExpenseController.handle);
expenseRoutes.get("/:id", getExpenseByIdController.handle);
expenseRoutes.get("/user/:id", listAllExpensesByUserIdController.handle);
expenseRoutes.delete("/:id", deleteExpenseByIdController.handle);
expenseRoutes.put("/:id", updateExpenseByIdController.handle);

export { expenseRoutes };
