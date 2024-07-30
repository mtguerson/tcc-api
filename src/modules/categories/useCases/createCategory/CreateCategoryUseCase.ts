import { Category } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CategoryDTO } from "../../dtos/CategoryDTO";

export class CreateCategoryUseCase {
  async execute({ userId, name }: CategoryDTO): Promise<Category> {
    const userIdExists = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!userIdExists) {
      throw new AppError('User not found');
    }

    const categoryNameExists = await prisma.category.findFirst({
      where: {
        userId,
        name
      }
    });

    if (categoryNameExists) {
      throw new AppError('Category name already exists');
    }

    const category = await prisma.category.create({
      data: {
        userId,
        name,
      }
    });

    return category;
  }
}