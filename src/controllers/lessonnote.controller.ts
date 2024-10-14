import { Response } from "express";
import slug from "slug";
import { CreateNote, deleteNote, getNoteById, listAllNotes, updateNote } from "~/services/lessonnote.service";
import { UserRequest } from "~/types"; // Import the extended Request interface

// Get all LessonNotes
export const getLessonNotes = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const LessonNotes = await listAllNotes();
        res.status(200).json(LessonNotes);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving LessonNotes',
            error: error.message
        });
    }
};

// Get a single LessonNote by ID
export const getLessonNoteByIdController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const LessonNote = await getNoteById(req.params.id);
        if (!LessonNote) {
            res.status(404).json({
                message: 'lesson Note not found'
            });
        } else {
            res.status(200).json(LessonNote);
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving lesson Note',
            error: error.message
        });
    }
};

// Create a new LessonNote
export const createLessonNoteController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const { title, levelId, roomId, isPublished, file_url, subjectId,description } = req.body;
        const { user } = req;
        const LessonNote = await CreateNote({
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
            message: 'lesson note created successfully',
            LessonNote
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating lesson Note',
            error: error.message
        });
    }
};

// Update an LessonNote by ID
export const updateLessonNoteController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const { title, isPublished, file_url, subjectId, levelId, roomId,description } = req.body;
        const { user } = req;
        const LessonNote = await updateNote(req.params.id, {
            title,
            slug: slug(title),
            isPublished,
            file_url,
            subjectId,
            levelId,
            roomId
        });
        if (!LessonNote) {
            res.status(404).json({
                message: 'lesson Note not found'
            });
        } else {
            res.status(200).json({
                message: 'lesson Note updated successfully',
                LessonNote
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error updating lesson Note',
            error: error.message
        });
    }
};

// Delete an LessonNote by ID
export const deleteLessonNoteController = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const LessonNote = await deleteNote(req.params.id);
        if (!LessonNote) {
            res.status(404).json({
                message: 'lesson Note not found'
            });
        } else {
            res.status(200).json({
                message: 'lesson Note deleted successfully'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting lesson Note',
            error: error.message
        });
    }
};
