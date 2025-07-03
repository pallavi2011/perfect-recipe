"use server";

import { db } from "@/lib/prisma";
import { NewRecipeSchema } from "@/schemas/index.js";

export const addRecipe = async (formData, userId) => {
    const validatedData = NewRecipeSchema.safeParse(formData);

    if (!validatedData.success) {
        return {
            error: "Invalid data",
        };
    }

    const {
        title,
        image,
        description,
        ingredients,
        instructions,
        servings,
        cookingTimeHours,
        cookingTimeMinutes,
        PrepTimeHours,
        PrepTimeMinutes,
        cuisine,
        calories,
        protein,
        fats,
        carbohydrates,
        fiber,
        netCarbs,
        sodium,
        cholesterol
    } = validatedData.data;

    await db.recipe.create({
    data: {
      title,
      image,
      description,
      servings,
      cookingTimeHours,
      cookingTimeMinutes,
      PrepTimeHours,
      PrepTimeMinutes,
      userId,
      cuisine,
      ingredients: {
        create: ingredients.map((name) => ({ name })),
      },
      instructions: {
        create: instructions.map((step) => ({ step })),
      },
      nutrition: {
        create: {
          calories,
          protein,
          fats,
          carbohydrates,
          fiber,
          netCarbs,
          sodium,
          cholesterol,
        },
        
      },
       ratings: {
      create: [
        {
          value: 1,
          userId: userId, 
        },
      ],
    },
    },
  });

  return { success: true };

   

   
}


export const editRecipe = async (formData, recipeId, userId) => {
    const validatedData = NewRecipeSchema.safeParse(formData);

    if (!validatedData.success) {
        return {
            error: "Invalid data",
        };
    }

    const {
        title,
        image,
        description,
        ingredients,
        instructions,
        servings,
        cookingTimeHours,
        cookingTimeMinutes,
        PrepTimeHours,
        PrepTimeMinutes,
        cuisine,
        calories,
        protein,
        fats,
        carbohydrates,
        fiber,
        netCarbs,
        sodium,
        cholesterol
    } = validatedData.data;

    // Before update, delete old related records
await db.ingredient.deleteMany({ where: { recipeId } });
await db.instruction.deleteMany({ where: { recipeId } });
await db.nutrition.deleteMany({ where: { recipeId } });

    await db.recipe.update({
      where:{
        id: recipeId,
        userId: userId
      },
    data: {
      title,
      image,
      description,
      servings,
      cookingTimeHours,
      cookingTimeMinutes,
      PrepTimeHours,
      PrepTimeMinutes,
      userId,
      cuisine,
      ingredients: {
        create: ingredients.map((name) => ({ name })),
      },
      instructions: {
        create: instructions.map((step) => ({ step })),
      },
      nutrition: {
        create: {
          calories,
          protein,
          fats,
          carbohydrates,
          fiber,
          netCarbs,
          sodium,
          cholesterol,
        },
      },
    },
  });

  return { success: true };

   

   
}