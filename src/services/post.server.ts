import type { User, Post} from "@prisma/client";
import { connect } from "http2";

import { prisma } from "~/db.server";

export type { Post } from "@prisma/client";


export async function createPost(data: {
  title: string;
  content?: string;
  published?: boolean;
  authorId: string;
}) {
  return prisma.post.create({
    data,
  });
}

export async function getPostById(id: number) {
  return prisma.post.findUnique({
    where: { id },
  });
}

export async function updatePost(id: number, data: Partial<{
  title: string;
  content?: string;
  published?: boolean;
}>) {
  return prisma.post.update({
    where: { id },
    data,
  });
}

export async function deletePost(id: number) {
  return prisma.post.delete({
    where: { id },
  });
}
