import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { jwtInfo } from "../../../../types/jwtInfo";
import { signInDto } from "../../dtos/signin";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class LoginUserUseCase {
  async execute({ email, password }: signInDto) {
    if (!email || !password) {
      throw new AppError("Invalid credentials");
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError("User not found");
    }

    const samePassword = bcrypt.compareSync(password, user.password);

    if (!samePassword) {
      throw new AppError("Invalid credentials");
    }

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
      accessToken: token,
    };
  }
}
