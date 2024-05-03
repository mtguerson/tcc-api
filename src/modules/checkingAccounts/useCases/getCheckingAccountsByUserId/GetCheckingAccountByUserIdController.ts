import { Request, Response } from "express";
import { GetCheckingAccountByUserIdUseCase } from "./GetCheckingAccountByUserIdUseCase";

export class GetCheckingAccountByUserIdController {
  async handle(req: Request, res: Response) {
    const { userId } = req.params;

    const getCheckingAccountByUserIdUseCase = new GetCheckingAccountByUserIdUseCase();

    const result = await getCheckingAccountByUserIdUseCase.execute({ userId });

    return res.status(200).json(result);
  }
}