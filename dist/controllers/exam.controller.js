"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExamController = exports.updateExamController = exports.createExamController = exports.getExamByIdController = exports.getExams = void 0;
const slug_1 = __importDefault(require("slug"));
const exam_service_1 = require("~/services/exam.service");
// Get all exams
const getExams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exams = yield (0, exam_service_1.listAllExams)();
        res.status(200).json(exams);
    }
    catch (error) {
        res.status(500).json({
            message: 'Error retrieving exams',
            error: error.message
        });
    }
});
exports.getExams = getExams;
// Get a single exam by ID
const getExamByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exam = yield (0, exam_service_1.getExamById)(Number(req.params.id));
        if (!exam) {
            res.status(404).json({
                message: 'Exam not found'
            });
        }
        else {
            res.status(200).json(exam);
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'Error retrieving exam',
            error: error.message
        });
    }
});
exports.getExamByIdController = getExamByIdController;
// Create a new exam
const createExamController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, levelId, roomId, isPublished, file_url, subjectId, examTypeId } = req.body;
        const { user } = req;
        const exam = yield (0, exam_service_1.CreateExam)({
            title,
            slug: (0, slug_1.default)(title),
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
    }
    catch (error) {
        res.status(500).json({
            message: 'Error creating exam',
            error: error.message
        });
    }
});
exports.createExamController = createExamController;
// Update an exam by ID
const updateExamController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, isPublished, file_url, subjectId, levelId, examTypeId, roomId } = req.body;
        const { user } = req;
        const exam = yield (0, exam_service_1.updateExam)(Number(req.params.id), {
            title,
            slug: (0, slug_1.default)(title),
            isPublished,
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
        }
        else {
            res.status(200).json({
                message: 'Exam updated successfully',
                exam
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'Error updating exam',
            error: error.message
        });
    }
});
exports.updateExamController = updateExamController;
// Delete an exam by ID
const deleteExamController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exam = yield (0, exam_service_1.deleteExam)(Number(req.params.id));
        if (!exam) {
            res.status(404).json({
                message: 'Exam not found'
            });
        }
        else {
            res.status(200).json({
                message: 'Exam deleted successfully'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'Error deleting exam',
            error: error.message
        });
    }
});
exports.deleteExamController = deleteExamController;
//# sourceMappingURL=exam.controller.js.map