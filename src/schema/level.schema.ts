import { z } from "zod";

export const createLevelSchema =  z.object({
  // In this example we will only validate the request body.
  body: z.object({
    // title should be valid and non-empty
    title: z.string({required_error:"Level title is required"})
  }),
});
export const updateLevelSchema = z.object({
  body: z.object({
    title: z.string({required_error:'Title is required'}),
  }),
  params: z.object({
    id: z.string({message:"Id is required"})
  })
});

export const getLevelByIdSchema = z.object({
  params: z.object({
     id: z.string({message:"Id is required"})
  })
});

export const deleteLevelSchema = z.object({
  params: z.object({
    id: z.string({message:"Id is required"})
  })
});
