import { User } from "@prisma/client";
import { prisma } from "../../../../../prisma/client";
import { AppError } from "../../../../../errors/AppError";

export class GetUsersUseCase {
  async execute({ id }: { id: string }): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id }
    });
    if (!user) {
      throw new AppError("Users not found", 404);
    }
    return user;
  }
}