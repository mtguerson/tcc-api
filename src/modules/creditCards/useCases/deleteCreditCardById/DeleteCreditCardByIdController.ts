import { Request, Response } from "express";
import { DeleteCreditCardByIdUseCase } from "./DeleteCreditCardByIdUseCase";

export class DeleteCreditCardByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteCreditCardByIdUseCase = new DeleteCreditCardByIdUseCase();

    const result = await deleteCreditCardByIdUseCase.execute(id);

    return res.status(200).json(result);
  }
}
