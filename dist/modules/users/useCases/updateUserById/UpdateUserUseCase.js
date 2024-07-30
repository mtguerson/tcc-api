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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserUseCase = void 0;
var client_1 = require("../../../../prisma/client");
var AppError_1 = require("../../../../errors/AppError");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var UpdateUserUseCase = /** @class */ (function () {
    function UpdateUserUseCase() {
    }
    UpdateUserUseCase.prototype.execute = function (userId_1, _a) {
        return __awaiter(this, arguments, void 0, function (userId, _b) {
            var user, emailAlreadyTaken, phoneAlreadyTaken, usernameAlreadyTaken, hashedPassword, passwordSalt, salt, updatedUser, jwtUserInfo, token;
            var name = _b.name, username = _b.username, email = _b.email, password = _b.password, phone = _b.phone;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, client_1.prisma.user.findUnique({
                            where: { id: userId },
                        })];
                    case 1:
                        user = _c.sent();
                        if (!user) {
                            throw new AppError_1.AppError("User not found");
                        }
                        if (!(email && email !== user.email)) return [3 /*break*/, 3];
                        return [4 /*yield*/, client_1.prisma.user.findUnique({
                                where: { email: email },
                            })];
                    case 2:
                        emailAlreadyTaken = _c.sent();
                        if (emailAlreadyTaken) {
                            throw new AppError_1.AppError("Email already taken");
                        }
                        _c.label = 3;
                    case 3:
                        if (!(phone && phone !== user.phone)) return [3 /*break*/, 5];
                        return [4 /*yield*/, client_1.prisma.user.findUnique({
                                where: { phone: phone },
                            })];
                    case 4:
                        phoneAlreadyTaken = _c.sent();
                        if (phoneAlreadyTaken) {
                            throw new AppError_1.AppError("Phone already taken");
                        }
                        _c.label = 5;
                    case 5:
                        if (!(username && username !== user.username)) return [3 /*break*/, 7];
                        return [4 /*yield*/, client_1.prisma.user.findUnique({
                                where: { username: username },
                            })];
                    case 6:
                        usernameAlreadyTaken = _c.sent();
                        if (usernameAlreadyTaken) {
                            throw new AppError_1.AppError("Username already taken");
                        }
                        _c.label = 7;
                    case 7:
                        hashedPassword = user.password;
                        if (password) {
                            passwordSalt = Number("".concat(process.env.SALT_PASSWORD || 10));
                            salt = bcrypt_1.default.genSaltSync(passwordSalt);
                            hashedPassword = bcrypt_1.default.hashSync(password, salt);
                        }
                        return [4 /*yield*/, client_1.prisma.user.update({
                                where: { id: userId },
                                data: {
                                    name: name,
                                    username: username,
                                    email: email,
                                    password: hashedPassword,
                                    phone: phone,
                                },
                            })];
                    case 8:
                        updatedUser = _c.sent();
                        jwtUserInfo = {
                            userId: updatedUser.id,
                            email: updatedUser.email,
                            name: updatedUser.name,
                            username: updatedUser.username,
                            isAdmin: updatedUser.isAdmin,
                        };
                        token = jsonwebtoken_1.default.sign(jwtUserInfo, "".concat(process.env.JWT_SECRET), {
                            expiresIn: "1d",
                        });
                        return [2 /*return*/, {
                                email: updatedUser.email,
                                name: updatedUser.name,
                                username: updatedUser.username,
                                phone: updatedUser.phone,
                                accessToken: token,
                            }];
                }
            });
        });
    };
    return UpdateUserUseCase;
}());
exports.UpdateUserUseCase = UpdateUserUseCase;
//# sourceMappingURL=UpdateUserUseCase.js.map