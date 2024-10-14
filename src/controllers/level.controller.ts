import { Response } from "express";
import slug from "slug";
import { listAllLevels, getLevelById, CreateLevel, updateLevel, deleteLevel } from "~/services/level.service";
import { UserRequest } from "~/types"; // Import the extended Request interface

// Get all Levels
export const getLevels = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const levels = await listAllLevels();
        res.status(200).json(levels);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving Levels',
            error: error.message
        });
    }
};

// Get a single Level by ID
export const getLevelByIdController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const level = await getLevelById(req.params.id);
        if (!level) {
            res.status(404).json({
                message: 'Level not found'
            });
        } else {
            res.status(200).json(level);
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving Level',
            error: error.message
        });
    }
};

// Create a new Level
export const createLevelController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const { title, levelId, roomId, isPublished, file_url, subjectId, LevelTypeId } = req.body;
        const { user } = req;
        const level = await CreateLevel({
            title,
            slug: slug(title),
        });
        res.status(201).json({
            message: 'Level created successfully',
            level
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating Level',
            error: error.message
        });
    }
};

// Update an Level by ID
export const updateLevelController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const { title } = req.body;
        const { user } = req;
        const level = await updateLevel(req.params.id, {
            title,
            slug: slug(title),
        });
        if (!level) {
            res.status(404).json({
                message: 'Level not found'
            });
        } else {
            res.status(200).json({
                message: 'Level updated successfully',
                level
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error updating Level',
            error: error.message
        });
    }
};

// Delete an Level by ID
export const deleteLevelController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const level = await deleteLevel(req.params.id);
        if (!level) {
            res.status(404).json({
                message: 'Level not found'
            });
        } else {
            res.status(200).json({
                message: 'Level deleted successfully'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting Level',
            error: error.message
        });
    }
};
