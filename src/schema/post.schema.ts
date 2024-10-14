import {z} from "zod";

export const createPostSchema = z.object({
    body: z.object({
        title: z.string({required_error: "Title is required"}),
        content: z.string({required_error: "Content is required"}),
        categoryId: z.string({required_error: "Category is required"}),
    })
});
export const getPostByIdSchema = z.object({
    body: z.object({
        id: z.string({required_error: "Id is required"})
    })
});
export const publishPostSchema = z.object({
    body: z.object({
        postId: z.string({required_error: "Post id is required"}),
        payload: z.boolean({required_error: "Payload id is required"}),
    })
});
export const unlikeUnlikePostSchema = z.object({
    body: z.object({
        postId: z.string({required_error: "Post id is required"}),
    })
});
export const updatePostSchema = z.object({
    body: z.object({
        id: z.string({required_error: "Post id is required"}),
        title: z.string({required_error: "Title is required"}),
        content: z.string({required_error: "Content is required"}),
        categoryId: z.string({required_error: "Category is required"}),
    })
});


