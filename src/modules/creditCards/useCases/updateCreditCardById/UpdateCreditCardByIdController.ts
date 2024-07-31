import { Request, Response } from "express";
import { UpdateCreditCardByIdUseCase } from "./UpdateCreditCardByIdUseCase";

export class UpdateCreditCardByIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { userId, name, closingDate, invoice, lastDigits, limit } = req.body;

    const updateCreditCardByIdUseCase = new UpdateCreditCardByIdUseCase();

    const result = await updateCreditCardByIdUseCase.execute({
      userId,
      id,
      closingDate,
      invoice,
      lastDigits,
      limit,
      name,
    });

    return res.status(200).json(result);
  }
}
