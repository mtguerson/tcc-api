import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { VerifyToken } from "../../../../middlewares/auth";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password, cpf, phone } = req.body;

    const createUserUseCase = new CreateUserUseCase();

    const result = await createUserUseCase.execute({
      name,
      email,
      password,
      cpf,
      phone,
    });

    return res.status(201).json(result);
  }
}
