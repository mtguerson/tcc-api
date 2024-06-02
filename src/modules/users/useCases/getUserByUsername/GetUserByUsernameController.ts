import { Request, Response } from "express";
import { GetUserByUsernameUseCase } from "./GetUserByUsernameUseCase";

export class GetUserByUsernameController {
  async handle(req: Request, res: Response) {
    const { username } = req.params;

    const getUserByUsernameUseCase = new GetUserByUsernameUseCase();

    const result = await getUserByUsernameUseCase.execute({ username });

    return res.status(200).json(result);
  }
}
