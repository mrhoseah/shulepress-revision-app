import type { User, Level, Room, Subject } from "@prisma/client";
import { prisma } from "~/db.server";

export type { Subject } from "@prisma/client";


export async function listAllSubjects() {
  return prisma.subject.findMany();
}

export async function getSubjectById(id: string) {
  return prisma.subject.findUnique({
    where: { id },
  });
}
export async function getSubjectBySlug(slug: string) {
  return prisma.subject.findUnique({
    where: { slug, },
  });
}

async function getPaginatedSubjects(page: number, pageSize: number) {
  const [results, totalCount] = await Promise.all([
    prisma.subject.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.subject.count(),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    results,
    totalCount,
    totalPages,
    currentPage: page,
  };
}


 
export function CreateSubject({
 title,
   slug,
   levelId,
authorId
}: Pick<Subject,  "title"| "slug"> & {
  authorId: User["id"],levelId:Level["id"]
}) {
  return prisma.subject.create({
        data: {
            title,
            slug,
            level:{
                connect:{
                    id:levelId
                }
            },
            author: {
                connect: {
                    id: authorId,
                },
            }
        }
    });
}
export async function updateSubject(
  id: string,
  data: Partial<Pick<Subject, "title" | "slug"|"isPublished">> & { levelId?: Level["id"] }
) {
  // Create the updateData object without levelId
  const { levelId, ...updateData } = data;

  return prisma.subject.update({
    where: { id },
    data: {
      ...updateData,
      level: levelId ? { connect: { id: levelId } } : undefined,
    },
  });
}

export async function deleteSubject(id: string) {
  return prisma.subject.delete({
    where: { id },
  });
}


