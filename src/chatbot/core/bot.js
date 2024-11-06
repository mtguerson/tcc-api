"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatBot = void 0;
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const finances_bot_prompt_1 = require("../prompts/finances-bot-prompt");
const backend_request_1 = __importDefault(require("../Backend/backend.request"));
const report_bot_prompt_1 = require("../prompts/report-bot-prompt");
const general_bot_prompt_1 = require("../prompts/general-bot-prompt");
class ChatBot {
    constructor(APITOKEN, USERNAME) {
        this.APITOKEN = APITOKEN;
        this.USERNAME = USERNAME;
        this.timeoutUser = null;
        this.groqContext = {
            chatHistory: (0, general_bot_prompt_1.generalBotPrompt)(),
            tools: (0, general_bot_prompt_1.generalBotToolsPrompt)(),
        };
        this.backendService = backend_request_1.default;
        this.telegramSender = new node_telegram_bot_api_1.default(APITOKEN, {
            polling: true,
        });
        this.GroqSender = new groq_sdk_1.default({
            apiKey: process.env.GROQ_API_KEY,
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.telegramSender.on('message', (message) => this.handleMessages(message));
            console.log('Bot is running....');
        });
    }
    startFinancesBot(_, chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield this.backendService.getCategories();
            const checkingAccounts = yield this.backendService.getCheckingAccount();
            const welcomeMessage = 'Chatbot de finanças iniciado. Vamos começar?';
            this.groqContext = {
                chatHistory: (0, finances_bot_prompt_1.financesBotPrompt)({ categories, checkingAccounts }),
                tools: (0, finances_bot_prompt_1.financesBotToolsPrompt)(),
            };
            this.groqContext.chatHistory.push({
                role: 'assistant',
                content: welcomeMessage,
            });
            yield this.sendMessage(chatId, welcomeMessage);
        });
    }
    startReportBot(_, chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const transactions = yield this.backendService.getTransactions();
            const checkingAccounts = yield this.backendService.getCheckingAccount();
            const categories = yield this.backendService.getCategories();
            const welcomeMessage = 'Chatbot de relatórios iniciado. Vamos começar?';
            this.groqContext = {
                chatHistory: (0, report_bot_prompt_1.reportBotPrompt)({
                    transactions,
                    checkingAccounts,
                    categories,
                }),
                tools: [],
            };
            this.groqContext.chatHistory.push({
                role: 'assistant',
                content: welcomeMessage,
            });
            yield this.sendMessage(chatId, welcomeMessage);
        });
    }
    quitSession(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const quitMessage = 'Sessão encerrada. Obrigado por usar o bot de finanças.';
            yield this.sendMessage(chatId, quitMessage);
            this.groqContext = {
                chatHistory: (0, general_bot_prompt_1.generalBotPrompt)(),
                tools: (0, general_bot_prompt_1.generalBotToolsPrompt)(),
            };
        });
    }
    handelTransaction(response, chatId, toolId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const successMessage = 'Transação criada com sucesso. Obrigado por usar o bot de finanças.';
                yield this.backendService.createTransaction(response);
                yield this.sendMessage(chatId, successMessage);
                this.groqContext.chatHistory.push({
                    tool_call_id: toolId,
                    role: 'tool',
                    content: successMessage,
                });
            }
            catch (error) {
                const errorMessage = 'Erro ao processar a transação. Por favor, tente novamente.';
                console.error('Erro ao criar transação:', error);
                yield this.sendMessage(chatId, errorMessage);
                this.groqContext.chatHistory.push({
                    role: 'assistant',
                    content: errorMessage,
                });
            }
        });
    }
    sendMessage(chatId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.telegramSender.sendMessage(chatId, message);
        });
    }
    handleGroqCallFunction(toolCall, chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const noRepeatsCalls = Array.from(new Map(toolCall.map((tool) => [tool.function.name, tool])).values());
            for (const tool of noRepeatsCalls) {
                const functionName = tool.function.name;
                const functionArgs = JSON.parse(tool.function.arguments);
                if (typeof this[functionName] === 'function') {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    yield this[functionName](functionArgs, chatId, tool.id);
                }
            }
        });
    }
    resetTimeoutUser(chatId) {
        const timeInMinutes = 5;
        const timeInMilliseconds = timeInMinutes * 60000;
        if (this.timeoutUser) {
            clearTimeout(this.timeoutUser);
        }
        this.timeoutUser = setTimeout(() => {
            this.quitSession(chatId);
        }, timeInMilliseconds);
    }
    handleMessages(message) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            if (((_a = message.chat) === null || _a === void 0 ? void 0 : _a.username) !== this.USERNAME)
                return;
            const chatId = message.chat.id;
            const userFirstName = message.chat.first_name;
            const messageContent = message.text;
            if (((_b = message.text) === null || _b === void 0 ? void 0 : _b.toLocaleLowerCase()) === 'sair') {
                this.quitSession(chatId);
                return;
            }
            this.resetTimeoutUser(chatId);
            this.groqContext.chatHistory.push({
                role: 'user',
                content: messageContent !== null && messageContent !== void 0 ? messageContent : '',
                name: userFirstName,
            });
            const groqResponse = yield this.getResponseGroqResponse();
            const groqMessage = groqResponse.choices[0].message;
            const response = (_c = groqMessage.content) !== null && _c !== void 0 ? _c : '';
            const toolNeeded = groqMessage.tool_calls;
            if (toolNeeded) {
                this.groqContext.chatHistory.push(groqMessage);
                yield this.handleGroqCallFunction(toolNeeded, chatId);
                return;
            }
            this.sendMessage(chatId, response);
            this.groqContext.chatHistory.push({
                role: 'assistant',
                content: response,
            });
        });
    }
    getResponseGroqResponse() {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                messages: this.groqContext.chatHistory,
                tools: this.groqContext.tools.length > 0 ? this.groqContext.tools : undefined,
                model: this.groqContext.tools.length > 0
                    ? 'llama3-groq-70b-8192-tool-use-preview'
                    : 'llama3-70b-8192',
                tool_choice: this.groqContext.tools.length > 0 ? 'auto' : undefined,
            };
            const chatCompletion = yield this.GroqSender.chat.completions.create(params);
            return chatCompletion;
        });
    }
}
exports.ChatBot = ChatBot;
