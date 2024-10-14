import { Router } from "express";
import {
    CreateSubjectController,
    getSubjectByIdController,
    getSubjects,
    updateSubjectController,
    deleteSubjectController
} from "~/controllers/subject.controller";
import validateInput, { parseFormData } from "~/middlewares/inputMiddleware";
import { createSubjectSchema, getSubjectByIdSchema, updateSubjectSchema } from "~/schema/subject.schema";
import { requireUser } from "~/middlewares/authMiddleware";

const subjectRouter = Router();

subjectRouter.get("/", getSubjects);
subjectRouter.get("/:id", validateInput(getSubjectByIdSchema), getSubjectByIdController);
subjectRouter.post("/", parseFormData, validateInput(createSubjectSchema), requireUser, CreateSubjectController);
subjectRouter.put("/:id", parseFormData, validateInput(updateSubjectSchema), requireUser, updateSubjectController);
subjectRouter.delete("/destroy/:id", validateInput(getSubjectByIdSchema), requireUser, deleteSubjectController);

export default subjectRouter;
