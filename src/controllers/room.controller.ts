import { Response } from "express";
import slug from "slug";
import { listAllRooms, getRoomById, CreateRoom, updateRoom, deleteRoom } from "~/services/room.service";
import { UserRequest } from "~/types"; // Import the extended Request interface

// Get all Rooms
export const getRooms = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const rooms = await listAllRooms();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving Rooms',
            error: error.message
        });
    }
};

// Get a single Room by ID
export const getRoomByIdController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const room = await getRoomById(req.params.id);
        if (!room) {
            res.status(404).json({
                message: 'room not found'
            });
        } else {
            res.status(200).json(room);
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving Room',
            error: error.message
        });
    }
};

// Create a new Room
export const createRoomController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const { title, RoomId, roomId, isPublished, file_url, subjectId, RoomTypeId } = req.body;
        const { user } = req;
        const Room = await CreateRoom({
            title,
            slug: slug(title),
        });
        res.status(201).json({
            message: 'Room created successfully',
            Room
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating Room',
            error: error.message
        });
    }
};

// Update an Room by ID
export const updateRoomController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const { title } = req.body;
        const { user } = req;
        const Room = await updateRoom(req.params.id, {
            title,
            slug: slug(title),
        });
        if (!Room) {
            res.status(404).json({
                message: 'Room not found'
            });
        } else {
            res.status(200).json({
                message: 'Room updated successfully',
                Room
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error updating Room',
            error: error.message
        });
    }
};

// Delete an Room by ID
export const deleteRoomController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const room = await deleteRoom(req.params.id);
        if (!room) {
            res.status(404).json({
                message: 'room not found'
            });
        } else {
            res.status(200).json({
                message: 'room deleted successfully'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting room',
            error: error.message
        });
    }
};
