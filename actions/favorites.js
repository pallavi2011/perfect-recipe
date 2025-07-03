"use server";

import { db } from "@/lib/prisma";

export const addToFavorites = async (recipeId, userId) => {
  try {
   const response = await db.favorite.create({
    data: {
      recipeId: recipeId,
      userId: userId,
    },
   })

   return response;

   
  } catch (error) {
    console.error('Error adding recipe to favorites:', error);
    throw error;
  }
}

export const removeFromFavorites = async (recipeId, userId) => {
  try {
    const response = await db.favorite.deleteMany({
      where: {
        recipeId: recipeId,
        userId: userId,
      },
    });

    return response;
  } catch (error) {
    console.error('Error removing recipe from favorites:', error);
    throw error;
  }
};

export async function isRecipeFavorited(recipeId, userId) {
  const favorite = await db.favorite.findFirst({
    where: { recipeId, userId },
  });
  return !!favorite;
}

export async function getFavoritesByUserId(userId) {
  try {
    const favorites = await db.favorite.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        recipe: {
          include:{
            user: {
              select: {
                image: true,
                name: true,
              },
            },
           
            ratings: true,
            comments: true,
          }
        }
        
      },
    });
    return favorites;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
}