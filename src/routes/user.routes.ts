import { Router } from 'express'
import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController'
import { GetUserByUsernameController } from '../modules/users/useCases/getUserByUsername/GetUserByUsernameController'
import { DeleteUserController } from '../modules/users/useCases/deleteUserById/DeleteUserController'
import { LoginUserController } from '../modules/users/useCases/loginUser/LoginUserController'
import { VerifyToken } from '../middlewares/auth'
import { GetUserMeController } from '../modules/users/useCases/getUserMe/getUserMeController'
import { UpdateUserController } from '../modules/users/useCases/updateUserById/UpdateUserController'

const createUserController = new CreateUserController()
const getUserByUsernameController = new GetUserByUsernameController()
const deleteUserController = new DeleteUserController()
const loginUserController = new LoginUserController()
const getUserMeController = new GetUserMeController()
const updateUserController = new UpdateUserController()
const verifyToken = new VerifyToken()

const userRoutes = Router()

userRoutes.post('/login', loginUserController.handle)
userRoutes.post('/create', createUserController.handle)

userRoutes.get('/me', verifyToken.handle, getUserMeController.handle)

userRoutes.delete('/:id', verifyToken.handleAdmin, deleteUserController.handle)

userRoutes.get(
  '/:username',
  verifyToken.handle,
  getUserByUsernameController.handle,
)

userRoutes.put('/', verifyToken.handle, updateUserController.handle)

export { userRoutes }
