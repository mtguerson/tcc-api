import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";
import { SignUpDto } from "../../dtos/signup";

export class GetUserByPhoneUseCase {
  async execute({ phone }: { phone: string }): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { phone }
    });
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }
}