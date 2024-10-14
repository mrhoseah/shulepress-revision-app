import { Router } from "express";
import {
    createPastPaperController,
    getPastPaperByIdController,
    getPastPapers,
    updatePastPaperController,
    deletePastPaperController
} from "~/controllers/pastpaper.controller";
import validateInput, { parseFormData } from "~/middlewares/inputMiddleware";
import { createPastPaperSchema, getPastPaperByIdSchema, updatePastPaperSchema,deletePastPaperSchema } from "~/schema/pastpaper.schema";
import { requireUser } from "~/middlewares/authMiddleware";

const pastPaperRouter = Router();

pastPaperRouter.get("/", getPastPapers);
pastPaperRouter.get("/:id", validateInput(getPastPaperByIdSchema), getPastPaperByIdController);
pastPaperRouter.post("/", parseFormData, validateInput(createPastPaperSchema), requireUser, createPastPaperController);
pastPaperRouter.put("/:id", parseFormData, validateInput(updatePastPaperSchema), requireUser, updatePastPaperController);
pastPaperRouter.delete("/destroy/:id", validateInput(getPastPaperByIdSchema), requireUser, deletePastPaperController);

export default pastPaperRouter;
