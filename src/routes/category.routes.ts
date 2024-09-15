import { Router } from 'express'
import { VerifyToken } from '../middlewares/auth'
import { CreateCategoryController } from '../modules/categories/useCases/createCategory/CreateCategoryController'
import { GetCategoryByUserIdController } from '../modules/categories/useCases/getCategoryByUserId/GetCategoryByUserIdController'
import { UpdateCategoryByIdController } from '../modules/categories/useCases/updateCategoryById/UpdateCategoryByIdController'
import { DeleteCategoryByIdController } from '../modules/categories/useCases/deleteCategoryById/DeleteCategoryByIdController'

const createCategoryController = new CreateCategoryController()

const getCategoryByUserIdController = new GetCategoryByUserIdController()

const updateCategoryByIdController = new UpdateCategoryByIdController()

const deleteCategoryByIdController = new DeleteCategoryByIdController()

const verifyToken = new VerifyToken()
const categoryRoutes = Router()

categoryRoutes.post(
  '/create',
  verifyToken.handle,
  createCategoryController.handle,
)

categoryRoutes.get(
  '/:id',
  verifyToken.handle,
  getCategoryByUserIdController.handle,
)

categoryRoutes.put(
  '/:id',
  verifyToken.handle,
  updateCategoryByIdController.handle,
)

categoryRoutes.delete(
  '/:id',
  verifyToken.handle,
  deleteCategoryByIdController.handle,
)

export { categoryRoutes }
