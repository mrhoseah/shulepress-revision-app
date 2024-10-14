import { Response } from "express";
import slug from "slug";
import { CreateLessonPlan, deleteLessonPlan, getLessonPlanById, listAllLessonPlans, updateLessonPlan } from "~/services/lesssonPlan.server";
import { UserRequest } from "~/types"; // Import the extended Request interface

// Get all LessonPlans
export const getLessonPlans = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const LessonPlans = await listAllLessonPlans();
        res.status(200).json(LessonPlans);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving LessonPlans',
            error: error.message
        });
    }
};

// Get a single LessonPlan by ID
export const getLessonPlanByIdController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const LessonPlan = await getLessonPlanById(req.params.id);
        if (!LessonPlan) {
            res.status(404).json({
                message: 'lesson plan not found'
            });
        } else {
            res.status(200).json(LessonPlan);
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving lesson plan',
            error: error.message
        });
    }
};

// Create a new LessonPlan
export const createLessonPlanController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const { title, levelId, roomId, isPublished, file_url, subjectId,description } = req.body;
        const { user } = req;
        const LessonPlan = await CreateLessonPlan({
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
            message: 'lesson plan created successfully',
            LessonPlan
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating lesson plan',
            error: error.message
        });
    }
};

// Update an LessonPlan by ID
export const updateLessonPlanController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const { title, isPublished, file_url, subjectId, levelId, LessonPlanTypeId, roomId,description } = req.body;
        const { user } = req;
        const LessonPlan = await updateLessonPlan(req.params.id, {
            title,
            slug: slug(title),
            isPublished,
            file_url,
            subjectId,
            levelId,
            roomId
        });
        if (!LessonPlan) {
            res.status(404).json({
                message: 'lesson plan not found'
            });
        } else {
            res.status(200).json({
                message: 'lesson plan updated successfully',
                LessonPlan
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error updating lesson plan',
            error: error.message
        });
    }
};

// Delete an LessonPlan by ID
export const deleteLessonPlanController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const LessonPlan = await deleteLessonPlan(req.params.id);
        if (!LessonPlan) {
            res.status(404).json({
                message: 'lesson plan not found'
            });
        } else {
            res.status(200).json({
                message: 'lesson plan deleted successfully'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting lesson plan',
            error: error.message
        });
    }
};
