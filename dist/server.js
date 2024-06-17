"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
var express_1 = __importDefault(require("express"));
var routes_1 = require("./routes");
var AppError_1 = require("./errors/AppError");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var cors = require('cors');
// Use the CORS middleware
app.use(cors({
    origin: 'http://localhost:5173' // Allow requests from this origin
}));
app.use(express_1.default.json());
app.use(routes_1.routes);
app.use(function (err, request, response, next) {
    if (err instanceof AppError_1.AppError) {
        return response.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }
    return response.status(500).json({
        status: "error",
        message: "Internal server error - ".concat(err.message),
    });
});
app.listen(process.env.PORT, function () {
    return console.log("Server is running on port ".concat(process.env.PORT, " \uD83D\uDE80"));
});
//# sourceMappingURL=server.js.map