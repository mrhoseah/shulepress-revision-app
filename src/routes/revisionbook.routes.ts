import { Router } from "express";
import {
    createRevisionBookController,
    getRevisionBookByIdController,
    getRevisionBooks,
    updateRevisionBookController,
    deleteRevisionBookController
} from "~/controllers/revisionbook.controller";
import validateInput, { parseFormData } from "~/middlewares/inputMiddleware";
import { createRevisionBookSchema, getRevisionBookByIdSchema, updateRevisionBookSchema,deleteRevisionBookSchema } from "~/schema/revisionbook.schema";
import { requireUser } from "~/middlewares/authMiddleware";

const revisionBookRouter = Router();

revisionBookRouter.get("/", getRevisionBooks);
revisionBookRouter.get("/:id", validateInput(getRevisionBookByIdSchema), getRevisionBookByIdController);
revisionBookRouter.post("/", parseFormData, validateInput(createRevisionBookSchema), requireUser, createRevisionBookController);
revisionBookRouter.put("/:id", parseFormData, validateInput(updateRevisionBookSchema), requireUser, updateRevisionBookController);
revisionBookRouter.delete("/destroy/:id", validateInput(getRevisionBookByIdSchema), requireUser, deleteRevisionBookController);

export default revisionBookRouter;
