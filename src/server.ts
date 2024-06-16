import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { routes } from "./routes";
import { AppError } from "./errors/AppError";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const cors = require('cors');

// Use the CORS middleware
app.use(cors({
  origin: 'http://localhost:5173' // Allow requests from this origin
}));

app.use(express.json());

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT} 🚀`)
);
