import { Response } from "express";
import slug from "slug";
import { listAllSetBooks, getSetBookById, CreateSetBook, updateSetBook, deleteSetBook } from "~/services/setbook.service";
import { UserRequest } from "~/types"; // Import the extended Request interface

// Get all setbooks
export const getsetbooks = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const setbooks = await listAllSetBooks();
        res.status(200).json(setbooks);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving lesson SetBooks',
            error: error.message
        });
    }
};

// Get a single setbook by ID
export const getSetBookByIdController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const setbook = await getSetBookById(req.params.id);
        if (!setbook) {
            res.status(404).json({
                message: 'lesson SetBook not found'
            });
        } else {
            res.status(200).json(setbook);
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving lesson SetBook',
            error: error.message
        });
    }
};

// Create a new setbook
export const CreateSetBookController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const { title, isPublished, description,file_url, subjectId } = req.body;
        const { user } = req;
        const setbook = await CreateSetBook({
            title,
            slug: slug(title),
            description,
            isPublished,
            file_url,
            subjectId,
            authorId: user.id // Use user ID from middleware
        });
        res.status(201).json({
            message: 'lesson SetBook created successfully',
            setbook
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating setbook',
            error: error.message
        });
    }
};

// Update an setbook by ID
export const updateSetBookController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const { title, isPublished, file_url, subjectId,description } = req.body;
        const { user } = req;
        const setbook = await updateSetBook(req.params.id, {
            title,
            slug: slug(title),
            isPublished,
            description,
            file_url,
            subjectId
        });
        if (!setbook) {
            res.status(404).json({
                message: 'lesson SetBook not found'
            });
        } else {
            res.status(200).json({
                message: 'lesson SetBook updated successfully',
                setbook
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error updating setbook',
            error: error.message
        });
    }
};

// Delete an setbook by ID
export const deleteSetBookController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const setbook = await deleteSetBook(req.params.id);
        if (!setbook) {
            res.status(404).json({
                message: 'lesson SetBook not found'
            });
        } else {
            res.status(200).json({
                message: 'lesson SetBook deleted successfully'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting setbook',
            error: error.message
        });
    }
};
