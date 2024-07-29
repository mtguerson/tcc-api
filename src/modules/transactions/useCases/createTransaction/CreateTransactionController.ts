import { Request, Response } from "express";
import { CreateTransactionUseCase } from "./CreateTransactioneUseCase";

export class CreateTransactionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, date, value, balanceAdjustment, type, creditCardId, categoryId, checkingAccountId } =
      request.body;

    const createTransactionUseCase = new CreateTransactionUseCase();

    const transaction = await createTransactionUseCase.execute({
      name,
      date,
      value,
      balanceAdjustment,
      type,
      creditCardId,
      categoryId,
      checkingAccountId,
    });

    return response.status(201).json(transaction);
  }
}
