import { z } from "zod";

export const loginSchema =  z.object({
  // In this example we will only validate the request body.
  body: z.object({
    // email should be valid and non-empty
    email: z.string({required_error:"Email address is required"}).email({ message: "Invalid email address" }),
    // password should be at least 6 characters
    password: z.string({required_error:"Password is required"}).min(8,{ message: "Must be 8 or more characters long" }),
  }),
});
export const sendEmailVerificationCodeSchema =  z.object({
  // In this example we will only validate the request body.
  body: z.object({
    // email should be valid and non-empty
    email: z.string({required_error:"Email address is required"}).email(),
  }),
});
export const verifyEmailVerificationCodeSchema =  z.object({
  // In this example we will only validate the request body.
  body: z.object({
    // email should be valid and non-empty
    email: z.string({required_error:"Email address is required"}).email(),
    otp: z.string({required_error:"OTP is required"}).min(6,{ message: "Must be 6 or more characters long" }),
  }),
});
export const forgotPasswordSchema =  z.object({
  // In this example we will only validate the request body.
  body: z.object({
    // email should be valid and non-empty
    email: z.string({required_error:"Email address is required"}).email()
  }),
});
export const resetPasswordSchema =  z.object({
  // In this example we will only validate the request body.
  body: z.object({
    // email should be valid and non-empty
    otp: z.string({required_error:"OTP is required"}).min(6,{ message: "Must be 6 or more characters long" }),
    // password should be at least 6 characters
    password: z.string({required_error:"Password is required"}).min(8,{ message: "Must be 8 or more characters long" }),
    passwordConfirmation: z.string({required_error:"Password confirmation is required"}).min(8,{ message: "Must be 8 or more characters long" })
  })
  .refine((args)=>args.password ===args.passwordConfirmation,{
    message:"Passwords do not match",
    path:["passwordConfirmation"]
  }),
});