import { z } from "zod";

export const createRoomSchema =  z.object({
  // In this example we will only validate the request body.
  body: z.object({
    // title should be valid and non-empty
    title: z.string({required_error:"Room /class title is required"})
  }),
});
export const updateRoomSchema = z.object({
  body: z.object({
    title: z.string({required_error:'Title is required'}),
  }),
  params: z.object({
    id: z.string({message:"Id is required"})
  })
});

export const getRoomByIdSchema = z.object({
  params: z.object({
     id: z.string({message:"Id is required"})
  })
});

export const deleteRoomSchema = z.object({
  params: z.object({
    id: z.string({message:"Id is required"})
  })
});
