"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exam_controller_1 = require("~/controllers/exam.controller");
const input_middleware_1 = __importStar(require("~/middlewares/input.middleware"));
const exam_schema_1 = require("~/schema/exam.schema");
const auth_middleware_1 = require("~/middlewares/auth.middleware");
const examRouter = (0, express_1.Router)();
examRouter.get("/", exam_controller_1.getExams);
examRouter.get("/:id", (0, input_middleware_1.default)(exam_schema_1.getExamByIdSchema), exam_controller_1.getExamByIdController);
examRouter.post("/", input_middleware_1.parseFormData, (0, input_middleware_1.default)(exam_schema_1.createExamSchema), auth_middleware_1.requireUser, exam_controller_1.createExamController);
examRouter.put("/:id", input_middleware_1.parseFormData, (0, input_middleware_1.default)(exam_schema_1.updateExamSchema), auth_middleware_1.requireUser, exam_controller_1.updateExamController);
examRouter.delete("/destroy/:id", (0, input_middleware_1.default)(exam_schema_1.getExamByIdSchema), auth_middleware_1.requireUser, exam_controller_1.deleteExamController);
exports.default = examRouter;
//# sourceMappingURL=exams.route.js.map