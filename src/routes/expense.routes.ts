import { Router } from "express";
import { CreateExpenseController } from "../modules/expenses/useCases/createExpense/CreateExpenseController";
import { GetExpenseByCreditCardIdController } from "../modules/expenses/useCases/getExpenseByCreditCardId/getExpenseByCreditCardIdController";
import { DeleteExpenseByIdController } from "../modules/expenses/useCases/deleteExpenseById/DeleteExpenseByIdController";
import { UpdateExpenseByIdController } from "../modules/expenses/useCases/updateExpenseById/updateExpenseByIdController";

const createExpenseController = new CreateExpenseController();
const getExpenseByCreditCardIdController = new GetExpenseByCreditCardIdController();
const deleteExpenseByIdController = new DeleteExpenseByIdController();
const updateExpenseByIdController = new UpdateExpenseByIdController();

const expenseRoutes = Router();

expenseRoutes.post("/create", createExpenseController.handle);
expenseRoutes.get("/:creditCardId", getExpenseByCreditCardIdController.handle);
expenseRoutes.delete("/:id", deleteExpenseByIdController.handle);
expenseRoutes.put("/:id", updateExpenseByIdController.handle);

export { expenseRoutes };