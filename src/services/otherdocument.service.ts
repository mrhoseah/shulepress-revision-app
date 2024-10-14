import type { OtherDocument, User } from "@prisma/client";
import { prisma } from "~/db.server";


export async function listAllOtherDocuments() {
  return prisma.otherDocument.findMany();
}

export async function getOtherDocumentById(id: string) {
  return prisma.otherDocument.findUnique({
    where: { id },
  });
}
export async function getOtherDocumentBySlug(slug: string) {
  return prisma.otherDocument.findUnique({
    where: { slug, },
  });
}

async function getPaginatedOtherDocuments(page: number, pageSize: number) {
  const [results, totalCount] = await Promise.all([
    prisma.otherDocument.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.otherDocument.count(),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    results,
    totalCount,
    totalPages,
    currentPage: page,
  };
}


 
export function CreateOtherDocument({
 title,
   slug,
   file_url,
   description,
authorId
}: Pick<OtherDocument,  "title"| "slug"|"isPublished"| "description"| "file_url"> & {
  authorId: User["id"]
}) {
  return prisma.otherDocument.create({
        data: {
            title,
            slug,
            description,
            file_url,
            author: {
                connect: {
                    id: authorId,
                },
            }
        }
    });
}
export async function updateOtherDocument(
  id: string,
  data: Partial<
    Pick<OtherDocument, "title" | "slug" | "isPublished" | "file_url" | "description">
  > 
) {
  const {...updatedData}=data;
  return prisma.otherDocument.update({
    where: { id },
    data: {
      ...updatedData
    },
  });
}

export async function deleteOtherDocument(id: string) {
  return prisma.otherDocument.delete({
    where: { id },
  });
}

