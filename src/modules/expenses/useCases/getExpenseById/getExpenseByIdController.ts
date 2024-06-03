import { Request, Response } from "express";
import { GetExpenseByIdUseCase } from "./GetExpenseByIdUseCase";

export class GetExpenseByIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const getExpenseByIdUseCase = new GetExpenseByIdUseCase();

    const result = await getExpenseByIdUseCase.execute({ id });

    return res.status(200).json(result);
  }
}
