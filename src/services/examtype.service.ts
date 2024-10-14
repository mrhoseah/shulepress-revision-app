import type { Level } from "@prisma/client";
import { connect } from "http2";

import { prisma } from "~/db.server";

export type { ExamType } from "@prisma/client";


export async function listAllExamTypes() {
  return prisma.examType.findMany();
}

export async function getExamTypeById(id: string) {
  return prisma.examType.findUnique({
    where: { id },
  });
}
export async function getExamTypeBySlug(slug: string) {
  return prisma.examType.findUnique({
    where: { slug, },
  });
}

async function getPaginatedExamTypes(page: number, pageSize: number) {
  const [results, totalCount] = await Promise.all([
    prisma.examType.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.examType.count(),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    results,
    totalCount,
    totalPages,
    currentPage: page,
  };
}


 
export function CreateExamType({
 title,
   slug,
}: Pick<Level,  "title" |"slug">) {
  return prisma.examType.create({
        data: {
            title,
            slug
        }
    });
}
export async function updateExamType(
  id: string,
  data: Partial<Pick<Level, "title"|"slug">>
) {
    // Create the updateData object without levelId
  const {...updateData } = data;
  return prisma.examType.update({
    where: { id },
    data: {
      ...updateData,
    },
  });
}

export async function deleteExamType(id: string) {
  return prisma.examType.delete({
    where: { id },
  });
}
