import type { User, SetBook, Subject, Level, Room } from "@prisma/client";
import { prisma } from "~/db.server";

export type { SetBook } from "@prisma/client";


export async function listAllSetBooks() {
  return prisma.setBook.findMany();
}

export async function getSetBookById(id: string) {
  return prisma.setBook.findUnique({
    where: { id },
  });
}
export async function getSetBookBySlug(slug: string) {
  return prisma.setBook.findUnique({
    where: { slug, },
  });
}

async function getPaginatedSetBooks(page: number, pageSize: number) {
  const [results, totalCount] = await Promise.all([
    prisma.setBook.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.setBook.count(),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    results,
    totalCount,
    totalPages,
    currentPage: page,
  };
}


 
export function CreateSetBook({
 title,
   slug,
   file_url,
   subjectId,
   description,
authorId
}: Pick<SetBook,  "title"| "slug"|"isPublished"| "description"| "file_url"> & {
  authorId: User["id"],subjectId:Subject["id"]
}) {
  return prisma.setBook.create({
        data: {
            title,
            slug,
            description,
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
export async function updateSetBook(
  id: string,
  data: Partial<
    Pick<SetBook, "title" | "slug" | "isPublished" | "file_url" | "description">
  > & {
    subjectId?: Subject["id"];
  }
) {
  const {subjectId,...updatedData}=data;
  return prisma.setBook.update({
    where: { id },
    data: {
      ...updatedData,
      subject: subjectId ? { connect: { id: subjectId } } : undefined,
    },
  });
}

export async function deleteSetBook(id: string) {
  return prisma.setBook.delete({
    where: { id },
  });
}

