import type { User, Exam, Subject, Level, ExamType, Room } from "@prisma/client";
import { connect } from "http2";

import { prisma } from "~/db.server";

export type { Exam } from "@prisma/client";


export async function listAllExams() {
  return prisma.exam.findMany();
}

export async function getExamById(id: string) {
  return prisma.exam.findUnique({
    where: { id },
  });
}
export async function getExamBySlug(slug: string) {
  return prisma.exam.findUnique({
    where: { slug, },
  });
}

async function getPaginatedExams(page: number, pageSize: number) {
  const [results, totalCount] = await Promise.all([
    prisma.exam.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.exam.count(),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    results,
    totalCount,
    totalPages,
    currentPage: page,
  };
}


 
export function CreateExam({
 title,
   slug,
   levelId,
   roomId,
   isPublished,
   file_url,
   subjectId,
   examTypeId,
   description,
authorId
}: Pick<Exam,  "title"| "slug"|"isPublished"|  "file_url" |"description"> & {
  authorId: User["id"],subjectId:Subject["id"],levelId:Level["id"],examTypeId:ExamType["id"],roomId:Room["id"]
}) {
  return prisma.exam.create({
        data: {
            title,
            description,
            slug,
            level:{
                connect:{
                    id:levelId
                }
            },
            room:{
                connect:{
                    id:roomId
                }
            },
            subject:{
                connect:{
                    id:subjectId
                }
            },
            isPublished,
            file_url,
            exam_type:{
                connect:{
                        id:examTypeId
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
export async function updateExam(
  id: string,
  data: Partial<Pick<Exam, "title" | "slug" | "isPublished" | "file_url" |"description">> & {
    subjectId?: Subject["id"];
    levelId?: Level["id"];
    examTypeId?: ExamType["id"];
    roomId?: Room["id"];
  }
) {
    // Create the updateData object without levelId
  const { levelId,roomId,subjectId,examTypeId, ...updateData } = data;
  return prisma.exam.update({
    where: { id },
    data: {
      ...updateData,
      level: levelId ? { connect: { id: levelId } } : undefined,
      room: roomId ? { connect: { id: roomId } } : undefined,
      subject: subjectId ? { connect: { id: subjectId } } : undefined,
      exam_type: examTypeId ? { connect: { id: examTypeId } } : undefined,
    },
  });
}

export async function deleteExam(id: string) {
  return prisma.exam.delete({
    where: { id },
  });
}
