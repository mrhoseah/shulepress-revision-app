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
exports.createLevel = createLevel;
exports.getLevelById = getLevelById;
exports.updateLevel = updateLevel;
exports.deleteLevel = deleteLevel;
const db_server_1 = require("~/db.server");
function createLevel(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_server_1.prisma.level.create({
            data,
        });
    });
}
function getLevelById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_server_1.prisma.level.findUnique({
            where: { id },
        });
    });
}
function updateLevel(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_server_1.prisma.level.update({
            where: { id },
            data,
        });
    });
}
function deleteLevel(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_server_1.prisma.level.delete({
            where: { id },
        });
    });
}
//# sourceMappingURL=level.server%20copy.js.map