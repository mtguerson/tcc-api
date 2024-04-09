import { Request, Response } from "express";
import { CreateCheckingAccountUseCase } from "./CreateCheckingAccountUseCase";

export class CreateCheckingAccountController {
  async handle(req: Request, res: Response) {
    const { userId, name, account, agency, bank, balance, maintenanceFee } = req.body;

    const createCheckingAccountUseCase = new CreateCheckingAccountUseCase();

    const result = await createCheckingAccountUseCase.execute({
      userId,
      name,
      account,
      agency,
      bank,
      balance,
      maintenanceFee
    });

    return res.status(201).json(result);
  }
}