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
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAllExams = listAllExams;
exports.getExamById = getExamById;
exports.getExamBySlug = getExamBySlug;
exports.CreateExam = CreateExam;
exports.updateExam = updateExam;
exports.deleteExam = deleteExam;
const db_server_1 = require("~/db.server");
function listAllExams() {
    return __awaiter(this, void 0, void 0, function* () {
        return db_server_1.prisma.exam.findMany();
    });
}
function getExamById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_server_1.prisma.exam.findUnique({
            where: { id },
        });
    });
}
function getExamBySlug(slug) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_server_1.prisma.exam.findUnique({
            where: { slug, },
        });
    });
}
function getPaginatedExams(page, pageSize) {
    return __awaiter(this, void 0, void 0, function* () {
        const [results, totalCount] = yield Promise.all([
            db_server_1.prisma.exam.findMany({
                skip: (page - 1) * pageSize,
                take: pageSize,
                where: {
                    title: {
                        contains: 'Prisma',
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            db_server_1.prisma.post.count({
                where: {
                    title: {
                        contains: 'Prisma',
                    },
                },
            }),
        ]);
        const totalPages = Math.ceil(totalCount / pageSize);
        return {
            results,
            totalCount,
            totalPages,
            currentPage: page,
        };
    });
}
function CreateExam({ title, slug, levelId, roomId, isPublished, file_url, subjectId, examTypeId, authorId }) {
    return db_server_1.prisma.exam.create({
        data: {
            title,
            slug,
            level: {
                connect: {
                    id: levelId
                }
            },
            room: {
                connect: {
                    id: roomId
                }
            },
            subject: {
                connect: {
                    id: subjectId
                }
            },
            isPublished,
            file_url,
            examType: {
                connect: {
                    id: examTypeId
                },
            },
            author: {
                connect: {
                    id: authorId,
                },
            }
        }
    });
}
function updateExam(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_server_1.prisma.exam.update({
            where: { id },
            data: Object.assign(Object.assign({}, data), { level: data.levelId ? { connect: { id: data.levelId } } : undefined, room: data.roomId ? { connect: { id: data.roomId } } : undefined, subject: data.subjectId ? { connect: { id: data.subjectId } } : undefined, examType: data.examTypeId ? { connect: { id: data.examTypeId } } : undefined }),
        });
    });
}
function deleteExam(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_server_1.prisma.exam.delete({
            where: { id },
        });
    });
}
//# sourceMappingURL=exam.service.js.map