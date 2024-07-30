import { Request, Response } from "express";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password, phone, username } = req.body;
    const { id } = req.params;

    const updateUserUseCase = new UpdateUserUseCase();

    const result = await updateUserUseCase.execute(id, {
      name,
      username,
      email,
      password,
      phone,
    });

    return res.status(200).json(result);
  }
}
