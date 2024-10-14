"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.verifyEmailVerificationCodeSchema = exports.sendEmailVerificationCodeSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    // In this example we will only validate the request body.
    body: zod_1.z.object({
        // email should be valid and non-empty
        email: zod_1.z.string({ required_error: "Email address is required" }).email({ message: "Invalid email address" }),
        // password should be at least 6 characters
        password: zod_1.z.string({ required_error: "Password is required" }).min(8, { message: "Must be 8 or more characters long" }),
    }),
});
exports.sendEmailVerificationCodeSchema = zod_1.z.object({
    // In this example we will only validate the request body.
    body: zod_1.z.object({
        // email should be valid and non-empty
        email: zod_1.z.string({ required_error: "Email address is required" }).email(),
    }),
});
exports.verifyEmailVerificationCodeSchema = zod_1.z.object({
    // In this example we will only validate the request body.
    body: zod_1.z.object({
        // email should be valid and non-empty
        email: zod_1.z.string({ required_error: "Email address is required" }).email(),
        otp: zod_1.z.string({ required_error: "OTP is required" }).min(6, { message: "Must be 6 or more characters long" }),
    }),
});
exports.forgotPasswordSchema = zod_1.z.object({
    // In this example we will only validate the request body.
    body: zod_1.z.object({
        // email should be valid and non-empty
        email: zod_1.z.string({ required_error: "Email address is required" }).email()
    }),
});
exports.resetPasswordSchema = zod_1.z.object({
    // In this example we will only validate the request body.
    body: zod_1.z.object({
        // email should be valid and non-empty
        otp: zod_1.z.string({ required_error: "OTP is required" }).min(6, { message: "Must be 6 or more characters long" }),
        // password should be at least 6 characters
        password: zod_1.z.string({ required_error: "Password is required" }).min(8, { message: "Must be 8 or more characters long" }),
        passwordConfirmation: zod_1.z.string({ required_error: "Password confirmation is required" }).min(8, { message: "Must be 8 or more characters long" })
    })
        .refine((args) => args.password === args.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"]
    }),
});
//# sourceMappingURL=auth.schema.js.map