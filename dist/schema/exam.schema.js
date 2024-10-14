"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExamSchema = exports.getExamByIdSchema = exports.updateExamSchema = exports.createExamSchema = void 0;
const zod_1 = require("zod");
exports.createExamSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().nonempty('Title is required'),
        levelId: zod_1.z.number().int('Level ID must be an integer'),
        roomId: zod_1.z.number().int('Room ID must be an integer'),
        isPublished: zod_1.z.boolean().default(false),
        file_url: zod_1.z.string().url('Invalid URL'),
        subjectId: zod_1.z.number().int('Subject ID must be an integer'),
        examTypeId: zod_1.z.number().int('Exam Type ID must be an integer'),
        authorId: zod_1.z.number().int('Author ID must be an integer')
    })
});
exports.updateExamSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Title is required' }),
        levelId: zod_1.z.number().int({ message: 'Level ID must be an integer' }),
        roomId: zod_1.z.number().int({ message: 'Room ID must be an integer' }),
        isPublished: zod_1.z.boolean().default(false),
        subjectId: zod_1.z.number().int({ message: 'Subject ID must be an integer' }),
        examTypeId: zod_1.z.number().int({ message: 'Exam Type ID must be an integer' }),
        authorId: zod_1.z.number().int({ message: 'Author ID must be an integer' })
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().regex(/^\d+$/, 'ID must be a number')
    })
});
exports.getExamByIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().regex(/^\d+$/, 'ID must be a number')
    })
});
exports.deleteExamSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().regex(/^\d+$/, 'ID must be a number')
    })
});
//# sourceMappingURL=exam.schema.js.map