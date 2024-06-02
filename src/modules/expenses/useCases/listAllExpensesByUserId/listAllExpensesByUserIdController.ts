import { Request, Response } from "express";
import { ListAllExpensesByUserIdUseCase } from "./listAllExpensesByUserIdUseCase";

export class ListAllExpensesByUserIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const listAllExpensesByUserIdUseCase = new ListAllExpensesByUserIdUseCase();

    const result = await listAllExpensesByUserIdUseCase.execute({ userId: id });

    return res.status(200).json(result);
  }
}
