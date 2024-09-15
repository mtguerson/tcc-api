import { Category } from '@prisma/client'
import { AppError } from '../../../../errors/AppError'
import { prisma } from '../../../../prisma/client'
import { CategoryDTO } from '../../dtos/CategoryDTO'

export class UpdateCategoryByIdUseCase {
  async execute({ name, userId, id }: CategoryDTO): Promise<Category> {
    const categoryExists = await prisma.category.findUnique({
      where: {
        id,
      },
    })

    if (!categoryExists) {
      throw new AppError('Category not found')
    }

    if (categoryExists.name !== name) {
      const categoryNameExists = await prisma.category.findFirst({
        where: {
          userId,
          name,
          NOT: {
            id,
          },
        },
      })

      if (categoryNameExists) {
        throw new AppError(
          'Another category with this name already exists for this user',
        )
      }
    }

    const categoryUpdated = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
        id,
        userId,
      },
    })

    return categoryUpdated
  }
}
