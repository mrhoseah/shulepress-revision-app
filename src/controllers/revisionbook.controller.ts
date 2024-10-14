import { Response } from "express";
import slug from "slug";
import { listAllRevisionBooks, getRevisionBookById, CreateRevisionBook, updateRevisionBook, deleteRevisionBook } from "~/services/revisionbook.service";
import { UserRequest } from "~/types"; // Import the extended Request interface

// Get all RevisionBooks
export const getRevisionBooks = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const revisionbooks = await listAllRevisionBooks();
        res.status(200).json(revisionbooks);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving revision books',
            error: error.message
        });
    }
};

// Get a single RevisionBook by ID
export const getRevisionBookByIdController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const revisionbook = await getRevisionBookById(req.params.id);
        if (!revisionbook) {
            res.status(404).json({
                message: 'revision books not found'
            });
        } else {
            res.status(200).json(revisionbook);
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving revision book ',
            error: error.message
        });
    }
};

// Create a new RevisionBook
export const createRevisionBookController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const { title, levelId, roomId, isPublished, file_url, subjectId,description } = req.body;
        const { user } = req;
        const RevisionBook = await CreateRevisionBook({
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
            message: 'revision books created successfully',
            RevisionBook
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating revision books',
            error: error.message
        });
    }
};

// Update an RevisionBook by ID
export const updateRevisionBookController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const { title, isPublished, file_url, subjectId, levelId, RevisionBookTypeId, roomId,description } = req.body;
        const { user } = req;
        const revisionBook = await updateRevisionBook(req.params.id, {
            title,
            slug: slug(title),
            isPublished,
            file_url,
            subjectId,
            levelId,
            roomId
        });
        if (!revisionBook) {
            res.status(404).json({
                message: 'revision books not found'
            });
        } else {
            res.status(200).json({
                message: 'revision books updated successfully',
                revisionBook
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error updating revision books',
            error: error.message
        });
    }
};

// Delete an RevisionBook by ID
export const deleteRevisionBookController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const revisionBook = await deleteRevisionBook(req.params.id);
        if (!revisionBook) {
            res.status(404).json({
                message: 'revision books not found'
            });
        } else {
            res.status(200).json({
                message: 'revision books deleted successfully'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting revision books',
            error: error.message
        });
    }
};
