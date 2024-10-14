import { Response } from "express";
import slug from "slug";
import { listAllPastPapers, getPastPaperById, CreatePastPaper, updatePastPaper, deletePastPaper } from "~/services/pastpaper.service";
import { UserRequest } from "~/types"; // Import the extended Request interface

// Get all pastPapers
export const getPastPapers = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const pastPapers = await listAllPastPapers();
        res.status(200).json(pastPapers);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving pastPapers',
            error: error.message
        });
    }
};

// Get a single pastPaper by ID
export const getPastPaperByIdController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const pastPaper = await getPastPaperById(req.params.id);
        if (!pastPaper) {
            res.status(404).json({
                message: 'past paper not found'
            });
        } else {
            res.status(200).json(pastPaper);
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving past paper',
            error: error.message
        });
    }
};

// Create a new pastPaper
export const createPastPaperController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const { title, levelId, roomId, isPublished, file_url, subjectId,description } = req.body;
        const { user } = req;
        const pastPaper = await CreatePastPaper({
            title,
            slug: slug(title),
            levelId,
            roomId,
            description,
            isPublished,
            file_url,
            subjectId,
            authorId: user.id // Use user ID from middleware
        });
        res.status(201).json({
            message: 'past paper created successfully',
            pastPaper
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating past paper',
            error: error.message
        });
    }
};

// Update an pastPaper by ID
export const updatePastPaperController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const { title, isPublished, file_url, subjectId, levelId, pastPaperTypeId, roomId,description } = req.body;
        const { user } = req;
        const pastPaper = await updatePastPaper(req.params.id, {
            title,
            slug: slug(title),
            isPublished,
            file_url,
            subjectId,
            levelId,
            roomId
        });
        if (!pastPaper) {
            res.status(404).json({
                message: 'past paper not found'
            });
        } else {
            res.status(200).json({
                message: 'past paper updated successfully',
                pastPaper
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error updating past paper',
            error: error.message
        });
    }
};

// Delete an pastPaper by ID
export const deletePastPaperController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const pastPaper = await deletePastPaper(req.params.id);
        if (!pastPaper) {
            res.status(404).json({
                message: 'past paper not found'
            });
        } else {
            res.status(200).json({
                message: 'past paper deleted successfully'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting past paper',
            error: error.message
        });
    }
};
