import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import cors from 'cors'
import dotenv from 'dotenv'

import { AppError } from './errors/AppError'
import { routes } from './routes'
import swaggerSetup from './swagger/swaggerConfig'

dotenv.config()

const app = express()
swaggerSetup(app)
// Use the CORS middleware
app.use(
  cors({
    origin: process.env.FRONT_END_URL,
  }),
)

app.use(express.json())

app.use(routes)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode ?? 400).json({
      status: 'error',
      message: err.message,
    })
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error`,
    content: `${err.message}`,
  })
})

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT} 🚀`),
)
