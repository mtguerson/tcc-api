import { Request, Response } from "express";
import { ListAllTransactionsByUserIdUseCase } from "./ListAllTransactionsByUserIdUseCase";

export class ListAllTransactionsByUserIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const listAllTransactionsByUserIdUseCase = new ListAllTransactionsByUserIdUseCase();

    const result = await listAllTransactionsByUserIdUseCase.execute({ userId: id });

    return res.status(200).json(result);
  }
}
