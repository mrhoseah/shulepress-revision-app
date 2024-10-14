import { Router } from "express";
import {
    createRoomController,
    getRoomByIdController,
    getRooms,
    updateRoomController,
    deleteRoomController
} from "~/controllers/room.controller";
import validateInput, { parseFormData } from "~/middlewares/inputMiddleware";
import { createSchemeOfWorkSchema, getSchemeOfWorkByIdSchema, updateSchemeOfWorkSchema } from "~/schema/schemeofwork.schema";
import { requireUser } from "~/middlewares/authMiddleware";

const roomRouter = Router();

roomRouter.get("/", getRooms);
roomRouter.get("/:id", validateInput(getSchemeOfWorkByIdSchema), getRoomByIdController);
roomRouter.post("/", parseFormData, validateInput(createSchemeOfWorkSchema), requireUser, createRoomController);
roomRouter.put("/:id", parseFormData, validateInput(updateSchemeOfWorkSchema), requireUser, updateRoomController);
roomRouter.delete("/destroy/:id", validateInput(getSchemeOfWorkByIdSchema), requireUser, deleteRoomController);

export default roomRouter;
