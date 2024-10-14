import type { User, PastPaper, Subject, Level, Room } from "@prisma/client";
import { prisma } from "~/db.server";

export type { PastPaper } from "@prisma/client";


export async function listAllPastPapers() {
  return prisma.pastPaper.findMany();
}

export async function getPastPaperById(id: string) {
  return prisma.pastPaper.findUnique({
    where: { id },
  });
}
export async function getPastPaperBySlug(slug: string) {
  return prisma.pastPaper.findUnique({
    where: { slug, },
  });
}

async function getPaginatedPastPapers(page: number, pageSize: number) {
  const [results, totalCount] = await Promise.all([
    prisma.pastPaper.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.pastPaper.count(),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    results,
    totalCount,
    totalPages,
    currentPage: page,
  };
}


 
export function CreatePastPaper({
 title,
   slug,
   levelId,
   roomId,
   file_url,
   subjectId,
   description,
authorId
}: Pick<PastPaper,  "title"| "slug"|"isPublished"| "description"| "file_url"> & {
  authorId: User["id"],subjectId:Subject["id"],levelId:Level["id"],roomId:Room["id"]
}) {
  return prisma.pastPaper.create({
        data: {
            title,
            slug,
            description,
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
            file_url,
            author: {
                connect: {
                    id: authorId,
                },
            }
        }
    });
}
export async function updatePastPaper(
  id: string,
  data: Partial<
    Pick<PastPaper, "title" | "slug" | "isPublished" | "file_url" | "description">
  > & {
    subjectId?: Subject["id"];
    levelId?: Level["id"];
    roomId?: Room["id"];
  }
) {
  const {roomId,levelId,subjectId,...updatedData}=data;
  return prisma.pastPaper.update({
    where: { id },
    data: {
      ...updatedData,
      level: roomId ? { connect: { id: levelId } } : undefined,
      room: roomId ? { connect: { id: roomId } } : undefined,
      subject: subjectId ? { connect: { id: subjectId } } : undefined,
    },
  });
}

export async function deletePastPaper(id: string) {
  return prisma.pastPaper.delete({
    where: { id },
  });
}

