import { Router } from "express";
import {
    CreateSchemeOfWorkController,
    getSchemeOfWorkByIdController,
    getSchemeoOfWorks,
    updateSchemeOfWorkController,
    deleteSchemeOfWorkController
} from "~/controllers/schemeofwork.controller";
import validateInput, { parseFormData } from "~/middlewares/inputMiddleware";
import { createExamSchema, getExamByIdSchema, updateExamSchema,deleteExamSchema } from "~/schema/exam.schema";
import { requireUser } from "~/middlewares/authMiddleware";

const examRouter = Router();

examRouter.get("/", getSchemeoOfWorks);
examRouter.get("/:id", validateInput(getExamByIdSchema), getSchemeOfWorkByIdController);
examRouter.post("/", parseFormData, validateInput(createExamSchema), requireUser, CreateSchemeOfWorkController);
examRouter.put("/:id", parseFormData, validateInput(updateExamSchema), requireUser, updateSchemeOfWorkController);
examRouter.delete("/destroy/:id", validateInput(getExamByIdSchema), requireUser, deleteSchemeOfWorkController);

export default examRouter;
