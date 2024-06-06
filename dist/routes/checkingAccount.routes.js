"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkingAccountRoutes = void 0;
var express_1 = require("express");
var CreateCheckingAccountController_1 = require("../modules/checkingAccounts/useCases/createCheckingAccount/CreateCheckingAccountController");
var GetCheckingAccountByUserIdController_1 = require("../modules/checkingAccounts/useCases/getCheckingAccountsByUserId/GetCheckingAccountByUserIdController");
var DeleteCheckingAccountByIdController_1 = require("../modules/checkingAccounts/useCases/deleteCheckingAccountById/DeleteCheckingAccountByIdController");
var UpdateCheckingAccountByIdController_1 = require("../modules/checkingAccounts/useCases/updateCheckingAccountById/UpdateCheckingAccountByIdController");
var createCheckingAccountController = new CreateCheckingAccountController_1.CreateCheckingAccountController();
var getCheckingAccountByUserIdController = new GetCheckingAccountByUserIdController_1.GetCheckingAccountByUserIdController();
var deleteCheckingAccountByIdController = new DeleteCheckingAccountByIdController_1.DeleteCheckingAccountByIdController();
var updateCheckingAccountByIdController = new UpdateCheckingAccountByIdController_1.UpdateCheckingAccountByIdController();
var checkingAccountRoutes = (0, express_1.Router)();
exports.checkingAccountRoutes = checkingAccountRoutes;
checkingAccountRoutes.post("/create", createCheckingAccountController.handle);
checkingAccountRoutes.get("/:userId", getCheckingAccountByUserIdController.handle);
checkingAccountRoutes.delete("/:id", deleteCheckingAccountByIdController.handle);
checkingAccountRoutes.put("/:id", updateCheckingAccountByIdController.handle);
//# sourceMappingURL=checkingAccount.routes.js.map