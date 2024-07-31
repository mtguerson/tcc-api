import { Router } from "express";
import { VerifyToken } from "../middlewares/auth";
import { CreateCreditCardController } from "../modules/creditCards/useCases/CreateCreditCard/CreateCreditCardController";
import { GetCreditCardByUserIdController } from "../modules/creditCards/useCases/getCreditCardByUserId/GetCreditCardByUserIdController";
import { DeleteCreditCardByIdController } from "../modules/creditCards/useCases/deleteCreditCardById/DeleteCreditCardByIdController";
import { UpdateCreditCardByIdController } from "../modules/creditCards/useCases/updateCreditCardById/UpdateCreditCardByIdController";

const createCreditCardController = new CreateCreditCardController();

const getCreditCardController = new GetCreditCardByUserIdController();

const deleteCreditCardByIdController = new DeleteCreditCardByIdController();

const updateCreditCardByIdController = new UpdateCreditCardByIdController();

const verifyToken = new VerifyToken();
const creditCardRoutes = Router();

creditCardRoutes.post(
  "/create",
  verifyToken.handle,
  createCreditCardController.handle
);

creditCardRoutes.get(
  "/list",
  verifyToken.handle,
  getCreditCardController.handle
);

creditCardRoutes.delete(
  "/:id",
  verifyToken.handle,
  deleteCreditCardByIdController.handle
);

creditCardRoutes.put(
  "/:id",
  verifyToken.handle,
  updateCreditCardByIdController.handle
);

export { creditCardRoutes };
