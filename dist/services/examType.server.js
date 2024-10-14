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
exports.createExamType = createExamType;
exports.getExamTypeById = getExamTypeById;
exports.updateExamType = updateExamType;
exports.deleteExamType = deleteExamType;
const db_server_1 = require("~/db.server");
function createExamType(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_server_1.prisma.examType.create({
            data,
        });
    });
}
function getExamTypeById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_server_1.prisma.examType.findUnique({
            where: { id },
        });
    });
}
function updateExamType(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_server_1.prisma.examType.update({
            where: { id },
            data,
        });
    });
}
function deleteExamType(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_server_1.prisma.examType.delete({
            where: { id },
        });
    });
}
//# sourceMappingURL=examType.server.js.map