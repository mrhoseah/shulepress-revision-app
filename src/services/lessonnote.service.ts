import type { User, Note, Subject, Level, Room } from "@prisma/client";
import { prisma } from "~/db.server";

export type { Note } from "@prisma/client";


export async function listAllNotes() {
  return prisma.note.findMany();
}

export async function getNoteById(id: string) {
  return prisma.note.findUnique({
    where: { id },
  });
}
export async function getNoteBySlug(slug: string) {
  return prisma.note.findUnique({
    where: { slug, },
  });
}

async function getPaginatedNotes(page: number, pageSize: number) {
  const [results, totalCount] = await Promise.all([
    prisma.note.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.note.count(),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    results,
    totalCount,
    totalPages,
    currentPage: page,
  };
}


 
export function CreateNote({
 title,
   slug,
   levelId,
   roomId,
   file_url,
   subjectId,
   description,
authorId
}: Pick<Note,  "title"| "slug"|"isPublished"| "description"| "file_url"> & {
  authorId: User["id"],subjectId:Subject["id"],levelId:Level["id"],roomId:Room["id"]
}) {
  return prisma.note.create({
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
export async function updateNote(
  id: string,
  data: Partial<
    Pick<Note, "title" | "slug" | "isPublished" | "file_url" | "description">
  > & {
    subjectId?: Subject["id"];
    levelId?: Level["id"];
    roomId?: Room["id"];
  }
) {
  const {roomId,levelId,subjectId,...updatedData}=data;
  return prisma.note.update({
    where: { id },
    data: {
      ...updatedData,
      level: roomId ? { connect: { id: levelId } } : undefined,
      room: roomId ? { connect: { id: roomId } } : undefined,
      subject: subjectId ? { connect: { id: subjectId } } : undefined,
    },
  });
}

export async function deleteNote(id: string) {
  return prisma.note.delete({
    where: { id },
  });
}

