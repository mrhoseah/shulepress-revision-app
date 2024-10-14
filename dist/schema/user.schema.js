"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserAccountSchema = void 0;
const zod_1 = require("zod");
exports.createUserAccountSchema = zod_1.z.object({
    // In this example we will only validate the request body.
    body: zod_1.z.object({
        // email should be valid and non-empty
        name: zod_1.z.string({ required_error: "Name is required" }),
        email: zod_1.z.string({ required_error: "Email address is required" }).email(),
        phone: zod_1.z.string({ required_error: "Phone is required" }).min(10, { message: "Must be 10 or more digits long" }),
    })
});
//# sourceMappingURL=user.schema.js.map