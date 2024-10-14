import { Response } from "express";
import slug from "slug";
import { listAllExamTypes, getExamTypeById, CreateExamType, updateExamType, deleteExamType } from "~/services/examtype.service";
import { UserRequest } from "~/types"; // Import the extended Request interface

// Get all ExamTypes
export const getExamTypes = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const ExamTypes = await listAllExamTypes();
        res.status(200).json(ExamTypes);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving exam types',
            error: error.message
        });
    }
};

// Get a single ExamType by ID
export const getExamTypeByIdController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const examType = await getExamTypeById(req.params.id);
        if (!examType) {
            res.status(404).json({
                message: 'ExamType not found'
            });
        } else {
            res.status(200).json(examType);
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving exam type',
            error: error.message
        });
    }
};

// Create a new ExamType
export const createExamTypeController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const { title } = req.body;
        const { user } = req;
        const ExamType = await CreateExamType({
            title,
            slug: slug(title),
        });
        res.status(201).json({
            message: 'Exam type created successfully',
            ExamType
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating ExamType',
            error: error.message
        });
    }
};

// Update an ExamType by ID
export const updateExamTypeController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const { title } = req.body;
        const { user } = req;
        const ExamType = await updateExamType(req.params.id, {
            title,
            slug: slug(title),
        });
        if (!ExamType) {
            res.status(404).json({
                message: 'ExamType not found'
            });
        } else {
            res.status(200).json({
                message: 'ExamType updated successfully',
                ExamType
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error updating ExamType',
            error: error.message
        });
    }
};

// Delete an ExamType by ID
export const deleteExamTypeController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const ExamType = await deleteExamType(req.params.id);
        if (!ExamType) {
            res.status(404).json({
                message: 'ExamType not found'
            });
        } else {
            res.status(200).json({
                message: 'ExamType deleted successfully'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting ExamType',
            error: error.message
        });
    }
};
