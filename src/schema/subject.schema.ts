import {z} from "zod";

export const createSubjectSchema = z.object({
  body: z.object({
    title: z.string({message:'Title is required'}),
    levelId: z.string({message:'Level ID must be an integer'}),
    roomId: z.string({message:'Room ID must be an integer'}),
  })
});

export const updateSubjectSchema = z.object({
  body: z.object({
    title: z.string({required_error:'Title is required'}),
    levelId: z.string({message:'Level ID must be an integer'}),
    roomId: z.string({message:'Room ID must be an integer'}),
  }),
  params: z.object({
    id: z.string()
  })
});

export const getSubjectByIdSchema = z.object({
  params: z.object({
    id: z.string()
  })
});

export const deleteSubjectSchema = z.object({
  params: z.object({
    id: z.string()
  })
});

