import { Request, Response } from "express";
import { GetUserByPhoneUseCase } from "./GetUserByPhoneUseCase";

export class GetUserByPhoneController {
  async handle(req: Request, res: Response) {
    const { phone } = req.params;

    const getUserByPhoneUseCase = new GetUserByPhoneUseCase();

    const result = await getUserByPhoneUseCase.execute({ phone });

    return res.status(201).json(result);
  }
}