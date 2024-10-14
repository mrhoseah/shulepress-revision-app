import { Response } from "express";
import slug from "slug";
import { listAllOtherDocuments, getOtherDocumentById, CreateOtherDocument, updateOtherDocument, deleteOtherDocument } from "~/services/otherdocument.service";
import { UserRequest } from "~/types"; // Import the extended Request interface

// Get all OtherDocuments
export const getOtherDocuments = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const otherDocuments = await listAllOtherDocuments();
        res.status(200).json(otherDocuments);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving other documents',
            error: error.message
        });
    }
};

// Get a single OtherDocument by ID
export const getOtherDocumentByIdController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const otherDocument = await getOtherDocumentById(req.params.id);
        if (!otherDocument) {
            res.status(404).json({
                message: 'other document not found'
            });
        } else {
            res.status(200).json(otherDocument);
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving OtherDocument',
            error: error.message
        });
    }
};

// Create a new OtherDocument
export const createOtherDocumentController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const { title, isPublished, description,file_url} = req.body;
        const { user } = req;
        const otherDocument = await CreateOtherDocument({
            title,
            slug: slug(title),
            description,
            isPublished,
            file_url,
            authorId: user.id // Use user ID from middleware
        });
        res.status(201).json({
            message: 'other document created successfully',
            otherDocument
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating OtherDocument',
            error: error.message
        });
    }
};

// Update an OtherDocument by ID
export const updateOtherDocumentController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const { title, isPublished, description,file_url} = req.body;
        const { user } = req;
        const otherDocument = await updateOtherDocument(req.params.id, {
            title,
            slug: slug(title),
            isPublished,
            description,
            file_url,
        });
        if (!otherDocument) {
            res.status(404).json({
                message: 'other document not found'
            });
        } else {
            res.status(200).json({
                message: 'other document updated successfully',
                otherDocument
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error updating OtherDocument',
            error: error.message
        });
    }
};

// Delete an OtherDocument by ID
export const deleteOtherDocumentController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const otherDocument = await deleteOtherDocument(req.params.id);
        if (!otherDocument) {
            res.status(404).json({
                message: 'other document not found'
            });
        } else {
            res.status(200).json({
                message: 'other document deleted successfully'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting other document',
            error: error.message
        });
    }
};
