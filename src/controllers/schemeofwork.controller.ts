import { Response } from "express";
import slug from "slug";
import { listAllSchemeOfWorks, getSchemeOfWorkById, CreateSchemeOfWork, updateSchemeOfWork, deleteSchemeOfWork } from "~/services/schemeofwork.service";
import { UserRequest } from "~/types"; // Import the extended Request interface

// Get all SchemeoOfWorks
export const getSchemeoOfWorks = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const SchemeoOfWorks = await listAllSchemeOfWorks();
        res.status(200).json(SchemeoOfWorks);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving SchemeoOfWorks',
            error: error.message
        });
    }
};

// Get a single SchemeoOfWork by ID
export const getSchemeOfWorkByIdController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const schemeoOfWork = await getSchemeOfWorkById(req.params.id);
        if (!schemeoOfWork) {
            res.status(404).json({
                message: 'scheme of work not found'
            });
        } else {
            res.status(200).json(schemeoOfWork);
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving scheme of work',
            error: error.message
        });
    }
};

// Create a new SchemeoOfWork
export const CreateSchemeOfWorkController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const { title, levelId, roomId, isPublished, file_url, subjectId,description } = req.body;
        const { user } = req;
        const SchemeoOfWork = await CreateSchemeOfWork({
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
            message: 'scheme of work created successfully',
            SchemeoOfWork
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating scheme of work',
            error: error.message
        });
    }
};

// Update an SchemeoOfWork by ID
export const updateSchemeOfWorkController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const { title, isPublished, file_url, subjectId, levelId, SchemeoOfWorkTypeId, roomId,description } = req.body;
        const { user } = req;
        const schemeoOfWork = await updateSchemeOfWork(req.params.id, {
            title,
            slug: slug(title),
            isPublished,
            file_url,
            subjectId,
            levelId,
            roomId
        });
        if (!schemeoOfWork) {
            res.status(404).json({
                message: 'scheme of work not found'
            });
        } else {
            res.status(200).json({
                message: 'scheme of work updated successfully',
                schemeoOfWork
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error updating scheme of work',
            error: error.message
        });
    }
};

// Delete an SchemeoOfWork by ID
export const deleteSchemeOfWorkController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const schemeoOfWork = await deleteSchemeOfWork(req.params.id);
        if (!schemeoOfWork) {
            res.status(404).json({
                message: 'scheme of work not found'
            });
        } else {
            res.status(200).json({
                message: 'scheme of work deleted successfully'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting scheme of work',
            error: error.message
        });
    }
};
