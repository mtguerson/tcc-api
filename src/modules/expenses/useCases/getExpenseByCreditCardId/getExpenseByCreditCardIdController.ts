import { Request, Response } from "express";
import { GetExpenseByCreditCardIdUseCase } from "./getExpenseByCreditCardIdUseCase";

export class GetExpenseByCreditCardIdController {
  async handle(req: Request, res: Response) {
    const { creditCardId } = req.params;

    const getExpenseByCreditCardIdUseCase = new GetExpenseByCreditCardIdUseCase();

    const result = await getExpenseByCreditCardIdUseCase.execute({ creditCardId });

    return res.status(200).json(result);
  }
}