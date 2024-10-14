import { Router } from "express";
import {
    createLevelController,
    getLevelByIdController,
    getLevels,
    updateLevelController,
    deleteLevelController
} from "~/controllers/level.controller";
import validateInput, { parseFormData } from "~/middlewares/inputMiddleware";
import { createLevelSchema, getLevelByIdSchema, updateLevelSchema,deleteLevelSchema } from "~/schema/level.schema";
import { requireUser } from "~/middlewares/authMiddleware";

const levelRouter = Router();

levelRouter.get("/", getLevels);
levelRouter.get("/:id", validateInput(getLevelByIdSchema), getLevelByIdController);
levelRouter.post("/", parseFormData, validateInput(createLevelSchema), requireUser, createLevelController);
levelRouter.put("/:id", parseFormData, validateInput(updateLevelSchema), requireUser, updateLevelController);
levelRouter.delete("/destroy/:id", validateInput(getLevelByIdSchema), requireUser, deleteLevelController);

export default levelRouter;
