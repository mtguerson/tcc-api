import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { SignUpDto } from "../../dtos/signup";
import { AppError } from "../../../../errors/AppError";

export class CreateUserUseCase {
  async execute({ name, email, password, cpf, phone }: SignUpDto): Promise<User> {
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const phoneAlreadyTaken = await prisma.user.findUnique({
      where: {
        phone
      }
    });

    if (phoneAlreadyTaken) {
      throw new AppError("Phone already taken");
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        cpf,
        phone
      }
    });

    return user;
  }
}