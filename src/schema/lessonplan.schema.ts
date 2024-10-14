import {z} from "zod";

export const createLessonPlanSchema = z.object({
  body: z.object({
    title: z.string({message:'Title is required'}),
    levelId: z.number().int('Level ID must be an integer'),
    roomId: z.number().int('Room ID must be an integer'),
    isPublished: z.boolean().default(false),
    file_url: z.string().url('Invalid URL'),
    subjectId: z.number().int('Subject ID must be an integer'),
    authorId: z.number().int('Author ID must be an integer')
  })
});

export const updateLessonPlanSchema = z.object({
  body: z.object({
    title: z.string({required_error:'Title is required'}),
    levelId: z.number().int({message:'Level ID must be an integer'}),
    roomId: z.number().int({message:'Room ID must be an integer'}),
    isPublished: z.boolean().default(false),
    subjectId: z.number().int({message:'Subject ID must be an integer'}),
    authorId: z.number().int({message:'Author ID must be an integer'})
  }),
  params: z.object({
    id: z.string().regex(/^\d+$/, 'ID must be a number')
  })
});

export const getLessonPlanByIdSchema = z.object({
  params: z.object({
    id: z.string({required_error:'ID is required'}),
  })
});

export const deleteLessonPlanSchema = z.object({
  params: z.object({
    id: z.string({required_error:'ID is required'}),
  })
});

