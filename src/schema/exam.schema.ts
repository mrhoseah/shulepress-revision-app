import {z} from "zod";

export const createExamSchema = z.object({
  body: z.object({
    title: z.string().nonempty('Title is required'),
    levelId: z.number().int('Level ID must be an integer'),
    roomId: z.number().int('Room ID must be an integer'),
    isPublished: z.boolean().default(false),
    file_url: z.string().url('Invalid URL'),
    subjectId: z.number().int('Subject ID must be an integer'),
    examTypeId: z.number().int('Exam Type ID must be an integer'),
    authorId: z.number().int('Author ID must be an integer')
  })
});

export const updateExamSchema = z.object({
  body: z.object({
    title: z.string({required_error:'Title is required'}),
    levelId: z.number().int({message:'Level ID must be an integer'}),
    roomId: z.number().int({message:'Room ID must be an integer'}),
    isPublished: z.boolean().default(false),
    subjectId: z.number().int({message:'Subject ID must be an integer'}),
    examTypeId: z.number().int({message:'Exam Type ID must be an integer'}),
    authorId: z.number().int({message:'Author ID must be an integer'})
  }),
  params: z.object({
    id: z.string().regex(/^\d+$/, 'ID must be a number')
  })
});

export const getExamByIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'ID must be a number')
  })
});

export const deleteExamSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'ID must be a number')
  })
});

