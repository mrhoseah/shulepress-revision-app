import type { User, LessonPlan, Subject, Level, Room } from "@prisma/client";
import { prisma } from "~/db.server";

export type { LessonPlan } from "@prisma/client";


export async function listAllLessonPlans() {
  return prisma.lessonPlan.findMany();
}

export async function getLessonPlanById(id: string) {
  return prisma.lessonPlan.findUnique({
    where: { id },
  });
}
export async function getLessonPlanBySlug(slug: string) {
  return prisma.lessonPlan.findUnique({
    where: { slug, },
  });
}

async function getPaginatedLessonPlans(page: number, pageSize: number) {
  const [results, totalCount] = await Promise.all([
    prisma.lessonPlan.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.lessonPlan.count(),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    results,
    totalCount,
    totalPages,
    currentPage: page,
  };
}


 
export function CreateLessonPlan({
 title,
   slug,
   levelId,
   roomId,
   isPublished,
   file_url,
   subjectId,
   description,
authorId
}: Pick<LessonPlan,  "title"| "slug"|"isPublished"| "description"| "file_url"> & {
  authorId: User["id"],subjectId:Subject["id"],levelId:Level["id"],roomId:Room["id"]
}) {
  return prisma.lessonPlan.create({
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
export async function updateLessonPlan(
  id: string,
  data: Partial<Pick<LessonPlan, "title" | "slug" | "isPublished" | "file_url" | "description">> & {
    subjectId?: Subject["id"];
    levelId?: Level["id"];
    roomId?: Room["id"];
  }
) {
  // Create the updateData object without levelId
  const { levelId,roomId,subjectId, ...updateData }=data;
  return prisma.lessonPlan.update({
    where: { id },
    data: {
      ...updateData,
      level: levelId ? { connect: { id: levelId } } : undefined,
      room: roomId ? { connect: { id: roomId } } : undefined,
      subject: subjectId ? { connect: { id: subjectId } } : undefined,
    },
  });
}

export async function deleteLessonPlan(id: string) {
  return prisma.lessonPlan.delete({
    where: { id },
  });
}

