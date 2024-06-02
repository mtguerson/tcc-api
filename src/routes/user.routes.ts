import { Router } from "express";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";
import { GetUserByUsernameController } from "../modules/users/useCases/getUserByUsername/GetUserByUsernameController";
import { DeleteUserController } from "../modules/users/useCases/deleteUserById/DeleteUserController";

const createUserController = new CreateUserController();
const getUserByUsernameController = new GetUserByUsernameController();
const deleteUserController = new DeleteUserController();

const userRoutes = Router();

userRoutes.post("/create", createUserController.handle);
userRoutes.delete("/delete/:id", deleteUserController.handle);
userRoutes.get("/:username", getUserByUsernameController.handle);

export { userRoutes };
