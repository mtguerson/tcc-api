import { Request, Response } from "express";
import { GetTransactionByIdUseCase } from "./GetTransactionByIdUseCase";
import { VerifyToken } from "../../../../middlewares/auth";

export class GetTransactionByIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const getTransactionByIdUseCase = new GetTransactionByIdUseCase();

    const result = await getTransactionByIdUseCase.execute({ id });

    return res.status(200).json(result);
  }
}
