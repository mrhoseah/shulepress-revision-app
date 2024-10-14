import { z } from "zod";

export const createUserAccountSchema =  z.object({
    // In this example we will only validate the request body.
    body: z.object({
        // email should be valid and non-empty
        name: z.string({required_error:"Name is required"}),
        email: z.string({required_error:"Email address is required"}).email(),
        phone: z.string({required_error:"Phone is required"}).min(10,{ message: "Must be 10 or more digits long" }),
    })
});