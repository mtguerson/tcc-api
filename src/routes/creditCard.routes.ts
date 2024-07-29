import { Router } from "express";
import { VerifyToken } from "../middlewares/auth";
import { CreateCreditCardController } from "../modules/creditCards/useCases/CreateCreditCard/CreateCreditCardController";

const createCreditCardController = new CreateCreditCardController();

const verifyToken = new VerifyToken();
const creditCardRoutes = Router();

creditCardRoutes.post(
  "/create",
  verifyToken.handle,
  createCreditCardController.handle
);

export { creditCardRoutes }