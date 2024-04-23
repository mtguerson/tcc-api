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

    const cpfAlreadyTaken = await prisma.user.findUnique({
      where: {
        cpf
      }
    });

    if (cpfAlreadyTaken) {
      throw new AppError("Cpf already taken");
    }

    if (phoneAlreadyTaken) {
      throw new AppError("Phone already taken");
    }

    if (cpf.length !== 11) {
      throw new AppError("Invalid CPF");
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