import { Request, Response } from "express";
import { VerifyToken } from "../../../../middlewares/auth";
import { CreateCreditCardUseCase } from "./CreateCreditCardUseCase";

export class CreateCreditCardController {
  async handle(req: Request, res: Response) {
    const { name, closingDate, invoice, lastDigits, limit } = req.body;

    const user = await VerifyToken.handleFoundUser(req);

    if (!user?.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const createCreditCardUseCase = new CreateCreditCardUseCase();

    const result = await createCreditCardUseCase.execute({
      userId: user.userId,
      name,
      closingDate,
      invoice,
      lastDigits,
      limit
    });

    return res.status(201).json(result);
  }
}
