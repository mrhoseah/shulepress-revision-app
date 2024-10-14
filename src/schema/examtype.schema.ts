import { z } from "zod";

export const createExamTypeSchema =  z.object({
  // In this example we will only validate the request body.
  body: z.object({
    // title should be valid and non-empty
    title: z.string({required_error:"Exam type title is required"})
  }),
});
export const updateExamTypeSchema = z.object({
  body: z.object({
    title: z.string({required_error:'Title is required'}),
  }),
  params: z.object({
    id: z.string({message:"Id is required"})
  })
});

export const getExamTypeByIdSchema = z.object({
  params: z.object({
     id: z.string({message:"Id is required"})
  })
});

export const deleteExamTypeSchema = z.object({
  params: z.object({
    id: z.string({message:"Id is required"})
  })
});
