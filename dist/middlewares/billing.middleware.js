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
//billingMiddleware.ts
const axios_1 = __importDefault(require("axios"));
const billingMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const tenantID = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.tenantID; // Assuming tenantID is part of the JWT payload
        const appID = req.header('App-ID'); // Assuming appID is passed in the header
        const response = yield axios_1.default.post('http://your-go-app/billing/check', { appID, tenantID });
        if (response.status === 402) {
            return res.status(402).send('Payment Required. You have unpaid invoices.');
        }
        next();
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
    }
});
module.exports = billingMiddleware;
//# sourceMappingURL=billing.middleware.js.map