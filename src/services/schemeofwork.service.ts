import type { User, SchemeofWork, Subject, Level, Room } from "@prisma/client";
import { prisma } from "~/db.server";


export async function listAllSchemeOfWorks() {
  return prisma.schemeofWork.findMany();
}

export async function getSchemeOfWorkById(id: string) {
  return prisma.schemeofWork.findUnique({
    where: { id },
  });
}
export async function getSchemeOfWorkBySlug(slug: string) {
  return prisma.schemeofWork.findUnique({
    where: { slug, },
  });
}

async function getPaginatedSchemeOfWorks(page: number, pageSize: number) {
  const [results, totalCount] = await Promise.all([
    prisma.schemeofWork.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.schemeofWork.count(),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    results,
    totalCount,
    totalPages,
    currentPage: page,
  };
}


 
export function CreateSchemeOfWork({
 title,
   slug,
   levelId,
   roomId,
   file_url,
   subjectId,
   description,
authorId
}: Pick<SchemeofWork,  "title"| "slug"|"isPublished"| "description"| "file_url"> & {
  authorId: User["id"],subjectId:Subject["id"],levelId:Level["id"],roomId:Room["id"]
}) {
  return prisma.schemeofWork.create({
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
export async function updateSchemeOfWork(
  id: string,
  data: Partial<
    Pick<SchemeofWork, "title" | "slug" | "isPublished" | "file_url" | "description">
  > & {
    subjectId?: Subject["id"];
    levelId?: Level["id"];
    roomId?: Room["id"];
  }
) {
  const {roomId,levelId,subjectId,...updatedData}=data;
  return prisma.schemeofWork.update({
    where: { id },
    data: {
      ...updatedData,
      level: roomId ? { connect: { id: levelId } } : undefined,
      room: roomId ? { connect: { id: roomId } } : undefined,
      subject: subjectId ? { connect: { id: subjectId } } : undefined,
    },
  });
}

export async function deleteSchemeOfWork(id: string) {
  return prisma.schemeofWork.delete({
    where: { id },
  });
}

