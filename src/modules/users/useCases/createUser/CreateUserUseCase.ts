import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { SignUpDto } from "../../dtos/signup";
import { AppError } from "../../../../errors/AppError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtInfo } from "../../../../types/jwtInfo";

type CreateUserResponse = Partial<
  User & {
    accessToken?: string;
  }
>;
export class CreateUserUseCase {
  async execute({
    name,
    email,
    password,
    cpf,
    phone,
  }: SignUpDto): Promise<CreateUserResponse> {
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const phoneAlreadyTaken = await prisma.user.findUnique({
      where: {
        phone,
      },
    });

    const cpfAlreadyTaken = await prisma.user.findUnique({
      where: {
        cpf,
      },
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

    const passwordSalt = Number(`${process.env.SALT_PASSWORD || 10}`);

    const salt = bcrypt.genSaltSync(passwordSalt);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        cpf,
        phone,
      },
    });

    const jwtUserInfo: jwtInfo = {
      userId: user.id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    };

    const token = jwt.sign(jwtUserInfo, `${process.env.JWT_SECRET}`, {
      expiresIn: "1d",
    });

    return {
      email: user.email,
      name: user.name,
      cpf: user.cpf,
      phone: user.phone,
      accessToken: token,
    };
  }
}
