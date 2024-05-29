import { Request, Response } from "express";
import { DeleteExpenseByIdUseCase } from "./DeleteExpenseByIdUseCase";

export class DeleteExpenseByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteExpenseByIdUseCase = new DeleteExpenseByIdUseCase();

    const result = await deleteExpenseByIdUseCase.execute(id);

    return res.status(200).json(result);
  }
}
