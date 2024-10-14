import { Router } from "express";
import {
    createOtherDocumentController,
    getOtherDocumentByIdController,
    getOtherDocuments,
    updateOtherDocumentController,
    deleteOtherDocumentController
} from "~/controllers/othercodument.controller";
import validateInput, { parseFormData } from "~/middlewares/inputMiddleware";
import { createOtherDocumentSchema, getOtherDocumentByIdSchema, updateOtherDocumentSchema,deleteOtherDocumentSchema } from "~/schema/othercodument.schema";
import { requireUser } from "~/middlewares/authMiddleware";

const otherDocumentRouter = Router();

otherDocumentRouter.get("/", getOtherDocuments);
otherDocumentRouter.get("/:id", validateInput(getOtherDocumentByIdSchema), getOtherDocumentByIdController);
otherDocumentRouter.post("/", parseFormData, validateInput(createOtherDocumentSchema), requireUser, createOtherDocumentController);
otherDocumentRouter.put("/:id", parseFormData, validateInput(updateOtherDocumentSchema), requireUser, updateOtherDocumentController);
otherDocumentRouter.delete("/destroy/:id", validateInput(getOtherDocumentByIdSchema), requireUser, deleteOtherDocumentController);

export default otherDocumentRouter;
