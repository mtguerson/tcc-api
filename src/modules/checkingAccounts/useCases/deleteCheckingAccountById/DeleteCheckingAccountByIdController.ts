import { Request, Response } from "express";
import { DeleteCheckingAccountByIdUseCase } from "./DeleteCheckingAccountByIdUseCase";

export class DeleteCheckingAccountByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteCheckingAccountByIdUseCase = new DeleteCheckingAccountByIdUseCase();

    const result = await deleteCheckingAccountByIdUseCase.execute(id);

    return res.status(200).json(result);
  }
}
