import { Router } from "express";
import {
    createLessonNoteController,
    getLessonNoteByIdController,
    getLessonNotes,
    updateLessonNoteController,
    deleteLessonNoteController
} from "~/controllers/lessonnote.controller";
import validateInput, { parseFormData } from "~/middlewares/inputMiddleware";
import { createLessonNoteSchema, getLessonNoteByIdSchema, updateLessonNoteSchema,deleteLessonNoteSchema } from "~/schema/lessonnote.schema";
import { requireUser } from "~/middlewares/authMiddleware";

const lessonNoteRouter = Router();

lessonNoteRouter.get("/", getLessonNotes);
lessonNoteRouter.get("/:id", validateInput(getLessonNoteByIdSchema), getLessonNoteByIdController);
lessonNoteRouter.post("/", parseFormData, validateInput(createLessonNoteSchema), requireUser, createLessonNoteController);
lessonNoteRouter.put("/:id", parseFormData, validateInput(updateLessonNoteSchema), requireUser, updateLessonNoteController);
lessonNoteRouter.delete("/destroy/:id", validateInput(getLessonNoteByIdSchema), requireUser, deleteLessonNoteController);

export default lessonNoteRouter;
