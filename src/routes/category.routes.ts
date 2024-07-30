import { Router } from "express";
import { VerifyToken } from "../middlewares/auth";
import { CreateCategoryController } from "../modules/categories/useCases/createCategory/CreateCategoryController";

const createCategoryController = new CreateCategoryController();

const verifyToken = new VerifyToken();
const categoryRoutes = Router();

categoryRoutes.post(
  "/create",
  verifyToken.handle,
  createCategoryController.handle
);

export { categoryRoutes }