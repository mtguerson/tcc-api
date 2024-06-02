import { Request, Response } from "express";
import { CreateExpenseUseCase } from "./CreateExpenseUseCase";

export class CreateExpenseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, date, value, creditCardId, categoryId, checkingAccountId } =
      request.body;

    const createExpenseUseCase = new CreateExpenseUseCase();

    const expense = await createExpenseUseCase.execute({
      name,
      date,
      value,
      creditCardId,
      categoryId,
      checkingAccountId,
    });

    return response.status(201).json(expense);
  }
}
