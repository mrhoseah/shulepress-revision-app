import { Router } from "express";
import {
    CreateSetBookController,
    getSetBookByIdController,
    getsetbooks,
    updateSetBookController,
    deleteSetBookController
} from "~/controllers/setbook.controller";
import validateInput, { parseFormData } from "~/middlewares/inputMiddleware";
import { createSetbookSchema, getSetbookByIdSchema, updateSetbookSchema } from "~/schema/setbook.schema";
import { requireUser } from "~/middlewares/authMiddleware";

const setbookRouter = Router();

setbookRouter.get("/", getsetbooks);
setbookRouter.get("/:id", validateInput(getSetbookByIdSchema), getSetBookByIdController);
setbookRouter.post("/", parseFormData, validateInput(createSetbookSchema), requireUser, CreateSetBookController);
setbookRouter.put("/:id", parseFormData, validateInput(updateSetbookSchema), requireUser, updateSetBookController);
setbookRouter.delete("/destroy/:id", validateInput(getSetbookByIdSchema), requireUser, deleteSetBookController);

export default setbookRouter;
