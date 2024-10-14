import { Router } from "express";
import {
    createLessonPlanController,
    getLessonPlanByIdController,
    getLessonPlans,
    updateLessonPlanController,
    deleteLessonPlanController
} from "~/controllers/lessonplan.controller";
import validateInput, { parseFormData } from "~/middlewares/inputMiddleware";
import { createLessonPlanSchema, getLessonPlanByIdSchema, updateLessonPlanSchema } from "~/schema/lessonplan.schema";
import { requireUser } from "~/middlewares/authMiddleware";

const lessonPlanRouter = Router();

lessonPlanRouter.get("/", getLessonPlans);
lessonPlanRouter.get("/:id", validateInput(getLessonPlanByIdSchema), getLessonPlanByIdController);
lessonPlanRouter.post("/", parseFormData, validateInput(createLessonPlanSchema), requireUser, createLessonPlanController);
lessonPlanRouter.put("/:id", parseFormData, validateInput(updateLessonPlanSchema), requireUser, updateLessonPlanController);
lessonPlanRouter.delete("/destroy/:id", validateInput(getLessonPlanByIdSchema), requireUser, deleteLessonPlanController);

export default lessonPlanRouter;
