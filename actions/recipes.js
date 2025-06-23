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