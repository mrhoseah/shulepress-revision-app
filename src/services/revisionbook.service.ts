import type { User, RevisionBook, Subject, Level, Room } from "@prisma/client";
import { prisma } from "~/db.server";

export type { RevisionBook } from "@prisma/client";


export async function listAllRevisionBooks() {
  return prisma.revisionBook.findMany();
}

export async function getRevisionBookById(id: string) {
  return prisma.revisionBook.findUnique({
    where: { id },
  });
}
export async function getRevisionBookBySlug(slug: string) {
  return prisma.revisionBook.findUnique({
    where: { slug, },
  });
}

async function getPaginatedRevisionBooks(page: number, pageSize: number) {
  const [results, totalCount] = await Promise.all([
    prisma.revisionBook.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.revisionBook.count(),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    results,
    totalCount,
    totalPages,
    currentPage: page,
  };
}


 
export function CreateRevisionBook({
 title,
   slug,
   levelId,
   roomId,
   file_url,
   subjectId,
   description,
authorId
}: Pick<RevisionBook,  "title"| "slug"|"isPublished"| "description"| "file_url"> & {
  authorId: User["id"],subjectId:Subject["id"],levelId:Level["id"],roomId:Room["id"]
}) {
  return prisma.revisionBook.create({
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
export async function updateRevisionBook(
  id: string,
  data: Partial<
    Pick<RevisionBook, "title" | "slug" | "isPublished" | "file_url" | "description">
  > & {
    subjectId?: Subject["id"];
    levelId?: Level["id"];
    roomId?: Room["id"];
  }
) {
  const {roomId,levelId,subjectId,...updatedData}=data;
  return prisma.revisionBook.update({
    where: { id },
    data: {
      ...updatedData,
      level: roomId ? { connect: { id: levelId } } : undefined,
      room: roomId ? { connect: { id: roomId } } : undefined,
      subject: subjectId ? { connect: { id: subjectId } } : undefined,
    },
  });
}

export async function deleteRevisionBook(id: string) {
  return prisma.revisionBook.delete({
    where: { id },
  });
}

