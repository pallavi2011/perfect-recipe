"use server";

import { db } from "@/lib/prisma";
import redis from "@/lib/redis";

export const getAllRecipes = async () => {
  
  try {
     const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }
    const recipes = await db.recipe.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        ingredients: true,
        instructions: true,
        nutrition: true,
        ratings:true,
        comments: true,
        user:{
           select: { name: true, image: true } ,
         }
      },
    });
   
    return recipes;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};

export const getRecipesByUserId = async (Id) => {
  try {
    const recipes = await db.recipe.findMany({
        where: { userId: Id },
        orderBy: { createdAt: 'desc' },
        include: {
            ingredients: true,
            instructions: true,
            nutrition: true,
            ratings:true,
             comments: true,
              user:{
           select: { name: true, image: true } ,
         }
        },
    });
    return recipes;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};

export const getRecipeByRecipeId = async (recipeId) => {
  try {
    const recipe = await db.recipe.findUnique({
      where: { id: recipeId },
      include: {
        ingredients: true,
        instructions: true,
        nutrition: true,
        ratings:true,
         comments: true,
         user:{
           select: { name: true, image: true } ,
         }
      },
    });
    return recipe;
  } catch (error) {
    console.error('Error fetching recipe by ID:', error);
    return null;
  }
}

export const getRecentRecipes = async(currentRecipeId) => {
  const recentRecipes = await db.recipe.findMany({
    where: { id: { not: currentRecipeId } },
    orderBy: { createdAt: 'desc' },
    take: 3,
     include: {
        ingredients: true,
        instructions: true,
        nutrition: true,
        ratings:true,
      },
  })

  return recentRecipes
}

export const updateRating = async (recipeId, rating, userId) => {
  const ratingResponse = await db.rating.upsert({
  where: {
    userId_recipeId: {
      userId,
      recipeId,
    },
  },
  update: { value: rating }, // use the correct field name
  create: { userId, recipeId, value: rating },
});
  return ratingResponse;

}