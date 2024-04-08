import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password, cpf } = req.body;

    const createUserUseCase = new CreateUserUseCase();

    const result = await createUserUseCase.execute({ name, email, password, cpf });

    return res.status(201).json(result);
  }
}