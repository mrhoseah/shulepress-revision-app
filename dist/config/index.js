"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT,
    baseUrl: process.env.APP_API_URL,
    clientUrl: process.env.CLIENT_URL,
    central_api_url: process.env.CENTRAL_APP_API_URL,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SERCRET,
    emailConfig: {
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    },
    emailFrom: process.env.EMAIL_FROM,
    isProduction: process.env.NODE_ENV === 'production',
    baseDomain: process.env.BASE_DOMAIN,
    codeExpiry: process.env.VERIFICATION_CODE_EXPIRY,
    cloudinary_name: process.env.CLOUDINARY_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};
//# sourceMappingURL=index.js.map