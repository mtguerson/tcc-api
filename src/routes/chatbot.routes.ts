import { Router } from 'express'
import { VerifyToken } from '../middlewares/auth'
import startChatBotController from '../modules/chatbot/useCases/startChatBot/startChatBotController'
import endChatBotController from '../modules/chatbot/useCases/endChatBot/endChatBotController'
import checkProcessController from '../modules/chatbot/useCases/checkProcess/checkProcessController'
import getProcessRunningController from '../modules/chatbot/useCases/getProcessRuning/getProcessRunningController'
import getProcessUsageController from '../modules/chatbot/useCases/getProcessUsage/getProcessUsageController'
import getMachineUsageController from '../modules/chatbot/useCases/getMachineUsage/getMachineUsageController'
import killProcessByTokenController from '../modules/chatbot/useCases/killProcessByToken/killProcessByTokenController'

const chatbotRoutes = Router()

const verifyToken = new VerifyToken()

chatbotRoutes.get('/start', verifyToken.handle, startChatBotController.handle)
chatbotRoutes.get('/end', verifyToken.handle, endChatBotController.handle)
chatbotRoutes.get('/check', verifyToken.handle, checkProcessController.handle)

// Admins Routes
chatbotRoutes.get(
  '/kill/process/:token',
  verifyToken.handleAdmin,
  killProcessByTokenController.handle,
)
chatbotRoutes.get(
  '/all-processes',
  verifyToken.handleAdmin,
  getProcessRunningController.handle,
)
chatbotRoutes.get(
  '/process/usage/server',
  verifyToken.handleAdmin,
  getMachineUsageController.handle,
)

chatbotRoutes.get(
  '/process/usage/:token',
  verifyToken.handleAdmin,
  getProcessUsageController.handle,
)

export default chatbotRoutes
