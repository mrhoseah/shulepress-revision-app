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
exports.requireUser = exports.validateToken = void 0;
const axios_1 = __importDefault(require("axios"));
// Middleware to validate token
const validateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.header('Authorization');
    if (!authHeader)
        res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    if (!token)
        res.sendStatus(401);
    try {
        const response = yield axios_1.default.post('http://localhost:1323/api/v1/auth/validate', { token });
        if (response.data.valid) {
            next();
        }
        else {
            res.sendStatus(403);
        }
    }
    catch (error) {
        res.sendStatus(500);
    }
});
exports.validateToken = validateToken;
// Middleware to require user and get user info
const requireUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization']; // Use 'headers' instead of 'header'
    if (!authHeader)
        res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    if (!token)
        res.sendStatus(401);
    try {
        const response = yield axios_1.default.post('http://localhost:1323/api/v1/auth/me', { token });
        if (response.data) {
            req.user = response.data; // Attach user info to req
            next();
        }
        else {
            res.sendStatus(403);
        }
    }
    catch (error) {
        res.sendStatus(500);
    }
});
exports.requireUser = requireUser;
//# sourceMappingURL=auth.middleware.js.map