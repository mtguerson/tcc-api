import { Category } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";

export class GetCategoryByUserIdUseCase {
  async execute({ userId }: { userId: string }): Promise<Category[]> {
    const category = await prisma.category.findMany({
      where: {
        userId
      }
    });

    if (category.length === 0) {
      throw new AppError("Not found!", 404);
    }

    return category;
  }
}