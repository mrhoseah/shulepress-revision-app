import { Response } from "express";
import slug from "slug";
import { listAllSubjects, getSubjectById, CreateSubject, updateSubject, deleteSubject } from "~/services/subject.service";
import { UserRequest } from "~/types"; // Import the extended Request interface

// Get all Subjects
export const getSubjects = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const Subjects = await listAllSubjects();
        res.status(200).json(Subjects);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving lesson Subjects',
            error: error.message
        });
    }
};

// Get a single Subject by ID
export const getSubjectByIdController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const subject = await getSubjectById(req.params.id);
        if (!subject) {
            res.status(404).json({
                message: 'lesson Subject not found'
            });
        } else {
            res.status(200).json(subject);
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving lesson subject',
            error: error.message
        });
    }
};

// Create a new Subject
export const CreateSubjectController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const { title,levelId } = req.body;
        const { user } = req;
        const subject = await CreateSubject({
            title,
            slug: slug(title),
            authorId: user.id, // Use user ID from middleware
            levelId
        });
        res.status(201).json({
            message: 'lesson subject created successfully',
            subject
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating Subject',
            error: error.message
        });
    }
};

// Update an Subject by ID
export const updateSubjectController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const { title, levelId } = req.body;
        const { user } = req;
        const subject = await updateSubject(req.params.id, {
            title,
            slug: slug(title),
            levelId,
        });
        if (!subject) {
            res.status(404).json({
                message: 'lesson subject not found'
            });
        } else {
            res.status(200).json({
                message: 'lesson subject updated successfully',
                subject
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error updating subject',
            error: error.message
        });
    }
};

// Delete an Subject by ID
export const deleteSubjectController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const subject = await deleteSubject(req.params.id);
        if (!subject) {
            res.status(404).json({
                message: 'lesson subject not found'
            });
        } else {
            res.status(200).json({
                message: 'lesson subject deleted successfully'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting subject',
            error: error.message
        });
    }
};
