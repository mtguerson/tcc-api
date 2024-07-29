"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var express_1 = require("express");
var user_routes_1 = require("./user.routes");
var checkingAccount_routes_1 = require("./checkingAccount.routes");
var transaction_routes_1 = require("./transaction.routes");
var routes = (0, express_1.Router)();
exports.routes = routes;
routes.use("/users", user_routes_1.userRoutes);
routes.use("/checkingAccounts", checkingAccount_routes_1.checkingAccountRoutes);
routes.use("/transactions", transaction_routes_1.transactionRoutes);
//# sourceMappingURL=index.js.map