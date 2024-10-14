"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostSchema = exports.unlikeUnlikePostSchema = exports.publishPostSchema = exports.getPostByIdSchema = exports.createPostSchema = void 0;
const zod_1 = require("zod");
exports.createPostSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: "Title is required" }),
        content: zod_1.z.string({ required_error: "Content is required" }),
        categoryId: zod_1.z.string({ required_error: "Category is required" }),
    })
});
exports.getPostByIdSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({ required_error: "Id is required" })
    })
});
exports.publishPostSchema = zod_1.z.object({
    body: zod_1.z.object({
        postId: zod_1.z.string({ required_error: "Post id is required" }),
        payload: zod_1.z.boolean({ required_error: "Payload id is required" }),
    })
});
exports.unlikeUnlikePostSchema = zod_1.z.object({
    body: zod_1.z.object({
        postId: zod_1.z.string({ required_error: "Post id is required" }),
    })
});
exports.updatePostSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({ required_error: "Post id is required" }),
        title: zod_1.z.string({ required_error: "Title is required" }),
        content: zod_1.z.string({ required_error: "Content is required" }),
        categoryId: zod_1.z.string({ required_error: "Category is required" }),
    })
});
//# sourceMappingURL=post.schema.js.map