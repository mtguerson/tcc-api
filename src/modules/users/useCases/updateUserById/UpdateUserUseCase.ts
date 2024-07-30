import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { UpdateUserDto } from "../../dtos/updateUser";
import { AppError } from "../../../../errors/AppError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtInfo } from "../../../../types/jwtInfo";

type UpdateUserResponse = Partial<
  User & {
    accessToken?: string;
  }
>;

export class UpdateUserUseCase {
  async execute(
    userId: string,
    {
      name,
      username,
      email,
      password,
      phone,
    }: UpdateUserDto
  ): Promise<UpdateUserResponse> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError("User not found");
    }

    if (email && email !== user.email) {
      const emailAlreadyTaken = await prisma.user.findUnique({
        where: { email },
      });

      if (emailAlreadyTaken) {
        throw new AppError("Email already taken");
      }
    }

    if (phone && phone !== user.phone) {
      const phoneAlreadyTaken = await prisma.user.findUnique({
        where: { phone },
      });

      if (phoneAlreadyTaken) {
        throw new AppError("Phone already taken");
      }
    }

    if (username && username !== user.username) {
      const usernameAlreadyTaken = await prisma.user.findUnique({
        where: { username },
      });

      if (usernameAlreadyTaken) {
        throw new AppError("Username already taken");
      }
    }

    let hashedPassword = user.password;
    if (password) {
      const passwordSalt = Number(`${process.env.SALT_PASSWORD || 10}`);
      const salt = bcrypt.genSaltSync(passwordSalt);
      hashedPassword = bcrypt.hashSync(password, salt);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        phone,
      },
    });

    const jwtUserInfo: jwtInfo = {
      userId: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      username: updatedUser.username,
      isAdmin: updatedUser.isAdmin,
    };

    const token = jwt.sign(jwtUserInfo, `${process.env.JWT_SECRET}`, {
      expiresIn: "1d",
    });

    return {
      email: updatedUser.email,
      name: updatedUser.name,
      username: updatedUser.username,
      phone: updatedUser.phone,
      accessToken: token,
    };
  }
}
