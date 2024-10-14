"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("~/middlewares/auth.middleware");
const authRoute = express_1.default.Router();
authRoute.post("/me", auth_middleware_1.requireUser, auth_middleware_1.validateToken);
exports.default = authRoute;
//# sourceMappingURL=auth.routes.js.map