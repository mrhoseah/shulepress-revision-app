import type { Level } from "@prisma/client";
import { connect } from "http2";

import { prisma } from "~/db.server";

export type { Room } from "@prisma/client";


export async function listAllRooms() {
  return prisma.room.findMany();
}

export async function getRoomById(id: string) {
  return prisma.room.findUnique({
    where: { id },
  });
}
export async function getRoomBySlug(slug: string) {
  return prisma.room.findUnique({
    where: { slug, },
  });
}

async function getPaginatedRooms(page: number, pageSize: number) {
  const [results, totalCount] = await Promise.all([
    prisma.room.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.room.count(),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    results,
    totalCount,
    totalPages,
    currentPage: page,
  };
}


 
export function CreateRoom({
 title,
   slug,
}: Pick<Level,  "title" |"slug">) {
  return prisma.room.create({
        data: {
            title,
            slug
        }
    });
}
export async function updateRoom(
  id: string,
  data: Partial<Pick<Level, "title"|"slug">>
) {
    // Create the updateData object without levelId
  const {...updateData } = data;
  return prisma.room.update({
    where: { id },
    data: {
      ...updateData,
    },
  });
}

export async function deleteRoom(id: string) {
  return prisma.room.delete({
    where: { id },
  });
}
