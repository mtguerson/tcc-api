import { Request, Response } from "express";
import { UpdateExpenseByIdUseCase } from "./updateExpenseByIdUseCase";

export class UpdateExpenseByIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { name, date, value, creditCardId, categoryId } = req.body;

    const updateExpenseByIdUseCase = new UpdateExpenseByIdUseCase();

    const result = await updateExpenseByIdUseCase.execute({
      id,
      name,
      date,
      value,
      creditCardId,
      categoryId
    });

    return res.status(200).json(result);
  }
}
