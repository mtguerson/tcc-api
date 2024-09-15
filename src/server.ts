import 'express-async-errors'
import express, { Request, Response } from 'express'
import { routes } from './routes'
import { AppError } from './errors/AppError'
import dotenv from 'dotenv'
import cors from 'cors'
import swaggerSetup from './swagger/swaggerConfig'
dotenv.config()

const app = express()
swaggerSetup(app)

// Use the CORS middleware
app.use(
  cors({
    origin: ['https://tcc-front-psi.vercel.app', 'http://localhost:5173'], // Allow requests from this origin
  }),
)

app.use(express.json())

app.use(routes)

app.use((err: Error, request: Request, response: Response) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
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
