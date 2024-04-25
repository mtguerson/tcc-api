import { Request, Response } from "express";
import { GetUsersUseCase } from "./GetUsersUseCase";

export class GetUsersController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const getUsersUseCase = new GetUsersUseCase();

    const result = await getUsersUseCase.execute({ id });

    return res.status(201).json(result);
  }
}