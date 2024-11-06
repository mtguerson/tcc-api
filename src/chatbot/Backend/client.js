"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendClient = void 0;
const axios_1 = __importDefault(require("axios"));
const __1 = require("..");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.BackendClient = axios_1.default.create({
    baseURL: process.env.BACKEND_URL,
});
exports.BackendClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${__1.USERTOKEN}`;
    return config;
});
