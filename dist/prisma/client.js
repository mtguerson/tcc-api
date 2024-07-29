"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
var client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
exports.prisma
    .$connect()
    .then(function () {
    console.log("Connected to the database 🚀");
})
    .catch(function (e) {
    console.error("Error connecting to the database: ", e);
    process.exit(1);
});
//# sourceMappingURL=client.js.map