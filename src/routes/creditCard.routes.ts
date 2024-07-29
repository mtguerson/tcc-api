import { Router } from "express";
import { VerifyToken } from "../middlewares/auth";
import { CreateCreditCardController } from "../modules/creditCards/useCases/createCreditCard/CreateCreditCardController";
import { GetCreditCardByUserIdController } from "../modules/creditCards/useCases/getCreditCardByUserId/GetCreditCardByUserIdController";

const createCreditCardController = new CreateCreditCardController();

const getCreditCardController = new GetCreditCardByUserIdController();

const verifyToken = new VerifyToken();
const creditCardRoutes = Router();

creditCardRoutes.post(
  "/create",
  verifyToken.handle,
  createCreditCardController.handle
);

creditCardRoutes.get(
  "/:id",
  verifyToken.handle,
  getCreditCardController.handle
);

export { creditCardRoutes }