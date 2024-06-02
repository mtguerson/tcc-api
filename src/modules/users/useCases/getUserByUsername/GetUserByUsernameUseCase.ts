import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";

export class GetUserByUsernameUseCase {
  async execute({ username }: { username: string }): Promise<User> {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }
}
