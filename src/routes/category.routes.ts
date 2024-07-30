import { Router } from "express";
import { VerifyToken } from "../middlewares/auth";
import { CreateCategoryController } from "../modules/categories/useCases/createCategory/CreateCategoryController";
import { GetCategoryByUserIdController } from "../modules/categories/useCases/getCategoryByUserId/GetCategoryByUserIdController";
import { UpdateCategoryByIdController } from "../modules/categories/useCases/updateCategoryById/UpdateCategoryByIdController";

const createCategoryController = new CreateCategoryController();

const getCategoryByUserIdController = new GetCategoryByUserIdController();

const updateCategoryByIdController = new UpdateCategoryByIdController();

const verifyToken = new VerifyToken();
const categoryRoutes = Router();

categoryRoutes.post(
  "/create",
  verifyToken.handle,
  createCategoryController.handle
);

categoryRoutes.get(
  "/:id",
  verifyToken.handle,
  getCategoryByUserIdController.handle
);

categoryRoutes.put(
  "/:id",
  verifyToken.handle,
  updateCategoryByIdController.handle
);

export { categoryRoutes }