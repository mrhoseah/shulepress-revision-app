import {z} from "zod";

export const createLessonNoteSchema = z.object({
  body: z.object({
    title: z.string({message:'Title is required'}),
    levelId: z.string({message:'Level ID must be an integer'}),
    roomId: z.string({message:'Room ID must be an integer'}),
    isPublished: z.boolean().default(false),
    file_url: z.string().url('Invalid URL'),
    subjectId: z.string({message:'Subject ID must be an integer'}),
    authorId: z.string({message:'Author ID must be an integer'})
  })
});

export const updateLessonNoteSchema = z.object({
  body: z.object({
    title: z.string({required_error:'Title is required'}),
    levelId: z.string({message:'Level ID must be an integer'}),
    roomId: z.string({message:'Room ID must be an integer'}),
    isPublished: z.boolean().default(false),
    subjectId: z.string({message:'Subject ID must be an integer'}),
    authorId: z.string({message:'Author ID must be an integer'})
  }),
  params: z.object({
    id: z.string()
  })
});

export const getLessonNoteByIdSchema = z.object({
  params: z.object({
    id: z.string()
  })
});

export const deleteLessonNoteSchema = z.object({
  params: z.object({
    id: z.string()
  })
});
