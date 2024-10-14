import type { Level } from "@prisma/client";
import { connect } from "http2";

import { prisma } from "~/db.server";

export type { Level } from "@prisma/client";


export async function listAllLevels() {
  return prisma.level.findMany();
}

export async function getLevelById(id: string) {
  return prisma.level.findUnique({
    where: { id },
  });
}
export async function getLevelBySlug(slug: string) {
  return prisma.level.findUnique({
    where: { slug, },
  });
}

async function getPaginatedLevels(page: number, pageSize: number) {
  const [results, totalCount] = await Promise.all([
    prisma.level.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.level.count(),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    results,
    totalCount,
    totalPages,
    currentPage: page,
  };
}


 
export function CreateLevel({
 title,
   slug,
}: Pick<Level,  "title" |"slug">) {
  return prisma.level.create({
        data: {
            title,
            slug
        }
    });
}
export async function updateLevel(
  id: string,
  data: Partial<Pick<Level, "title" |"slug">>
) {
    // Create the updateData object without levelId
  const {...updateData } = data;
  return prisma.level.update({
    where: { id },
    data: {
      ...updateData,
    },
  });
}

export async function deleteLevel(id: string) {
  return prisma.level.delete({
    where: { id },
  });
}
