import { AppError } from '../../../../errors/AppError'
import { prisma } from '../../../../prisma/client'

export class DeleteCategoryByIdUseCase {
  async execute(id: string): Promise<void> {
    const categoryExists = await prisma.category.findUnique({
      where: {
        id,
      },
    })

    if (!categoryExists) {
      throw new AppError('Category not found')
    }

    await prisma.category.delete({
      where: {
        id,
      },
    })
  }
}
