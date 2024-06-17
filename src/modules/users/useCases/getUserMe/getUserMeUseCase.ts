import { prisma } from "../../../../prisma/client";

export class GetUserMeUseCase {
  async execute(userId: string) {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        password: false,
      },
    });
  }
}
