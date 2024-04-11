import { Router } from "express";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";
import { GetUserByPhoneController } from "../modules/users/useCases/getUserByPhone/GetUserByPhoneController";

const createUserController = new CreateUserController();
const getUserByPhoneController = new GetUserByPhoneController();

const userRoutes = Router();

userRoutes.post("/create", createUserController.handle);
userRoutes.get("/:phone", getUserByPhoneController.handle);

export { userRoutes };