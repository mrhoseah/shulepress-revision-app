import { Router } from "express";
import {
    createExamController,
    getExamByIdController,
    getExams,
    updateExamController,
    deleteExamController
} from "~/controllers/exam.controller";
import validateInput, { parseFormData } from "~/middlewares/inputMiddleware";
import { createExamSchema, getExamByIdSchema, updateExamSchema,deleteExamSchema } from "~/schema/exam.schema";
import { requireUser } from "~/middlewares/authMiddleware";

const examRouter = Router();

examRouter.get("/", getExams);
examRouter.get("/:id", validateInput(getExamByIdSchema), getExamByIdController);
examRouter.post("/", parseFormData, validateInput(createExamSchema), requireUser, createExamController);
examRouter.put("/:id", parseFormData, validateInput(updateExamSchema), requireUser, updateExamController);
examRouter.delete("/destroy/:id", validateInput(getExamByIdSchema), requireUser, deleteExamController);

export default examRouter;
