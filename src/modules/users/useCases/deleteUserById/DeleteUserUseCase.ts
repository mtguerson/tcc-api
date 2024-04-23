import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";

export class DeleteUserUseCase {
  async execute(userId: string): Promise<void> {
    const userExists = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!userExists) {
      throw new AppError("User does not exist", 404);
    }

    await prisma.user.delete({
      where: {
        id: userId
      }
    });
  }
}