"use server"

import { db } from "@/lib/prisma";

export const deleteRecipeById = async (recipeId) => {
  try {
    const response = await db.recipe.delete({
        where: {
            id: recipeId,
        },
    })

    if (!response.ok) {
      throw new Error('Failed to delete recipe');
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return { error: error.message };
  }
}

export const addComment = async (recipeId,  text,userId, parentId) => {
  const comment = await db.comment.create({
      data: {
        text,
        recipeId,
        userId,
        parentId: parentId || null, // for replies, optional
      },
    });
  return comment;
}

async function getRepliesRecursive(parentId) {
  const replies = await db.comment.findMany({
    where: { parentId },
    include: {
      user: { select: { name: true, image: true } },
    },
    orderBy: { createdAt: 'asc' },
  });

  // For each reply, fetch its own replies recursively
  for (let reply of replies) {
    reply.replies = await getRepliesRecursive(reply.id);
  }
  return replies;
}

export const getRecipeComments = async (recipeId) => {
  const comments = await db.comment.findMany({
    where: { recipeId, parentId: null },
    include: {
      user: { select: { name: true, image: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  // Attach nested replies recursively
  for (let comment of comments) {
    comment.replies = await getRepliesRecursive(comment.id);
  }

  return comments;
};