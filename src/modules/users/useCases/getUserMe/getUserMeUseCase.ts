import { prisma } from "../../../../prisma/client";

export class GetUserMeUseCase {
  async execute(userId: string) {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        cpf: true,
        username: true,
        phone: true,
      },
    });
  }
}
