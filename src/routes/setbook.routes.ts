import { Router } from "express";
import {
    createSetbookController,
    getSetbookByIdController,
    getSetbooks,
    updateSetbookController,
    deleteSetbookController
} from "~/controllers/setbook.controller";
import validateInput, { parseFormData } from "~/middlewares/inputMiddleware";
import { createSetbookSchema, getSetbookByIdSchema, updateSetbookSchema,deleteSetbookSchema } from "~/schema/setbook.schema";
import { requireUser } from "~/middlewares/authMiddleware";

const setbookRouter = Router();

setbookRouter.get("/", getSetbooks);
setbookRouter.get("/:id", validateInput(getSetbookByIdSchema), getSetbookByIdController);
setbookRouter.post("/", parseFormData, validateInput(createSetbookSchema), requireUser, createSetbookController);
setbookRouter.put("/:id", parseFormData, validateInput(updateSetbookSchema), requireUser, updateSetbookController);
setbookRouter.delete("/destroy/:id", validateInput(getSetbookByIdSchema), requireUser, deleteSetbookController);

export default setbookRouter;
