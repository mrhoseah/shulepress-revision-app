import { Router } from "express";
import {
    createExamTypeController,
    getExamTypeByIdController,
    getExamTypes,
    updateExamTypeController,
    deleteExamTypeController
} from "~/controllers/examtype.controller";
import validateInput, { parseFormData } from "~/middlewares/inputMiddleware";
import { createExamTypeSchema, getExamTypeByIdSchema, updateExamTypeSchema,deleteExamTypeSchema } from "~/schema/examtype.schema";
import { requireUser } from "~/middlewares/authMiddleware";

const examTypeRouter = Router();

examTypeRouter.get("/", getExamTypes);
examTypeRouter.get("/:id", validateInput(getExamTypeByIdSchema), getExamTypeByIdController);
examTypeRouter.post("/", parseFormData, validateInput(createExamTypeSchema), requireUser, createExamTypeController);
examTypeRouter.put("/:id", parseFormData, validateInput(updateExamTypeSchema), requireUser, updateExamTypeController);
examTypeRouter.delete("/destroy/:id", validateInput(getExamTypeByIdSchema), requireUser, deleteExamTypeController);

export default examTypeRouter;
