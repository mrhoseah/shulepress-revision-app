import { Response } from "express";
import slug from "slug";
import { listAllExams, getExamById, CreateExam, updateExam, deleteExam } from "~/services/exam.service";
import { UserRequest } from "~/types"; // Import the extended Request interface

// Get all exams
export const getExams = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const exams = await listAllExams();
        res.status(200).json(exams);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving exams',
            error: error.message
        });
    }
};

// Get a single exam by ID
export const getExamByIdController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const exam = await getExamById(req.params.id);
        if (!exam) {
            res.status(404).json({
                message: 'Exam not found'
            });
        } else {
            res.status(200).json(exam);
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving exam',
            error: error.message
        });
    }
};

// Create a new exam
export const createExamController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const { title, levelId, roomId, isPublished, description,file_url, subjectId, examTypeId } = req.body;
        const { user } = req;
        const exam = await CreateExam({
            title,
            slug: slug(title),
            description,
            levelId,
            roomId,
            isPublished,
            file_url,
            subjectId,
            examTypeId,
            authorId: user.id // Use user ID from middleware
        });
        res.status(201).json({
            message: 'Exam created successfully',
            exam
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating exam',
            error: error.message
        });
    }
};

// Update an exam by ID
export const updateExamController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const { title, isPublished, file_url, subjectId,description, levelId, examTypeId, roomId } = req.body;
        const { user } = req;
        const exam = await updateExam(req.params.id, {
            title,
            slug: slug(title),
            isPublished,
            description,
            file_url,
            subjectId,
            levelId,
            examTypeId,
            roomId
        });
        if (!exam) {
            res.status(404).json({
                message: 'Exam not found'
            });
        } else {
            res.status(200).json({
                message: 'Exam updated successfully',
                exam
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error updating exam',
            error: error.message
        });
    }
};

// Delete an exam by ID
export const deleteExamController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const exam = await deleteExam(req.params.id);
        if (!exam) {
            res.status(404).json({
                message: 'Exam not found'
            });
        } else {
            res.status(200).json({
                message: 'Exam deleted successfully'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting exam',
            error: error.message
        });
    }
};
