import {z} from "zod";

export const createOtherDocumentSchema = z.object({
  body: z.object({
    title: z.string({message:'Title is required'}),
    description: z.string({required_error:'Description is required'}),
    isPublished: z.boolean().default(false),
    file_url: z.string().url('Invalid URL'),
    authorId: z.string({message:'Author ID must be an integer'})
  })
});

export const updateOtherDocumentSchema = z.object({
  body: z.object({
    title: z.string({required_error:'Title is required'}),
    description: z.string({required_error:'Description is required'}),
    isPublished: z.boolean().default(false),
    subjectId: z.string({message:'Subject ID must be an integer'}),
    authorId: z.string({message:'Author ID must be an integer'})
  }),
  params: z.object({
    id: z.string()
  })
});

export const getOtherDocumentByIdSchema = z.object({
  params: z.object({
    id: z.string()
  })
});

export const deleteOtherDocumentSchema = z.object({
  params: z.object({
    id: z.string()
  })
});

