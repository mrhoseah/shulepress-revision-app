import { Router } from "express";
import {
    createRoomController,
    getRoomByIdController,
    getRooms,
    updateRoomController,
    deleteRoomController
} from "~/controllers/room.controller";
import validateInput, { parseFormData } from "~/middlewares/inputMiddleware";
import { createRoomSchema, getRoomByIdSchema, updateRoomSchema } from "~/schema/room.schema";
import { requireUser } from "~/middlewares/authMiddleware";

const roomRouter = Router();

roomRouter.get("/", getRooms);
roomRouter.get("/:id", validateInput(getRoomByIdSchema), getRoomByIdController);
roomRouter.post("/", parseFormData, validateInput(createRoomSchema), requireUser, createRoomController);
roomRouter.put("/:id", parseFormData, validateInput(updateRoomSchema), requireUser, updateRoomController);
roomRouter.delete("/destroy/:id", validateInput(getRoomByIdSchema), requireUser, deleteRoomController);

export default roomRouter;
