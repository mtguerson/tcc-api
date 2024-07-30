import { Router } from "express";
import { VerifyToken } from "../middlewares/auth";
import { CreateCategoryController } from "../modules/categories/useCases/createCategory/CreateCategoryController";
import { GetCategoryByUserIdController } from "../modules/categories/useCases/getCategoryByUserId/GetCategoryByUserIdController";

const createCategoryController = new CreateCategoryController();

const getCategoryByUserIdController = new GetCategoryByUserIdController();

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

export { categoryRoutes }