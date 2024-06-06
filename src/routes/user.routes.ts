import { Router } from "express";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";
import { GetUserByUsernameController } from "../modules/users/useCases/getUserByUsername/GetUserByUsernameController";
import { DeleteUserController } from "../modules/users/useCases/deleteUserById/DeleteUserController";
import { LoginUserController } from "../modules/users/useCases/loginUser/LoginUserController";
import { VerifyToken } from "../middlewares/auth";

const createUserController = new CreateUserController();
const getUserByUsernameController = new GetUserByUsernameController();
const deleteUserController = new DeleteUserController();
const loginUserController = new LoginUserController();
const verifyToken = new VerifyToken();

const userRoutes = Router();

userRoutes.post("/create", createUserController.handle);
userRoutes.delete(
  "/delete/:id",
  verifyToken.handle,
  deleteUserController.handle
);
userRoutes.get(
  "/:username",
  verifyToken.handle,
  getUserByUsernameController.handle
);
userRoutes.post("/login", loginUserController.handle);

export { userRoutes };
