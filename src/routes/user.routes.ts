import { Router } from "express";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";
import { GetUserByPhoneController } from "../modules/users/useCases/getUserByPhone/GetUserByPhoneController";
import { DeleteUserController } from "../modules/users/useCases/deleteUserById/DeleteUserController";

const createUserController = new CreateUserController();
const getUserByPhoneController = new GetUserByPhoneController();
const deleteUserController = new DeleteUserController();

const userRoutes = Router();

userRoutes.post("/create", createUserController.handle);
userRoutes.delete("/delete/:id", deleteUserController.handle);
userRoutes.get("/:phone", getUserByPhoneController.handle);

export { userRoutes };