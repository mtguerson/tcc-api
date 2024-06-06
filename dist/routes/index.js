"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var express_1 = require("express");
var user_routes_1 = require("./user.routes");
var checkingAccount_routes_1 = require("./checkingAccount.routes");
var expense_routes_1 = require("./expense.routes");
var routes = (0, express_1.Router)();
exports.routes = routes;
routes.use("/users", user_routes_1.userRoutes);
routes.use("/checkingAccounts", checkingAccount_routes_1.checkingAccountRoutes);
routes.use("/expenses", expense_routes_1.expenseRoutes);
//# sourceMappingURL=index.js.map