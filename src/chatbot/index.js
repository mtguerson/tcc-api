"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.USERTOKEN = exports.USERNAME = exports.APITOKEN = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const bot_1 = require("./core/bot");
dotenv_1.default.config();
// get arguments from command line
const args = process.argv.slice(2);
exports.APITOKEN = args[0];
exports.USERNAME = args[1];
exports.USERTOKEN = args[2];
if (args.length < 1) {
    console.log('Usage: node bot.js <APITOKEN> <USERNAME> <USER_TOKEN>');
    process.exit(1);
}
const chatbot = new bot_1.ChatBot(exports.APITOKEN, exports.USERNAME);
chatbot.start();
