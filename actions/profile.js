"use server";

import { db } from "@/lib/prisma"



export const saveProfileDetails = async (data, Id) => {
    try { 
        const { name, email, experience } = data;
        const user = await db.user.update({
        where: { id: Id  }, 
        data: { name,
            email,
            experience
        },
        });
        return user;
    } catch (error) {
        console.error("Error saving profile bio:", error);
        throw new Error("Failed to save profile bio");
    }
}

export const saveProfileBio = async (bio, Id) => {
    try {
        const user = await db.user.update({
        where: { id: Id  }, 
        data: { bio : bio},
        });
        return user;
    } catch (error) {
        console.error("Error saving profile bio:", error);
        throw new Error("Failed to save profile bio");
    }
}

export const getUserDetails = async (Id) => {
    try {
        const user = await db.user.findUnique({
            where: { id: Id },
            
        });
        return user;
    } catch (error) {
        console.error("Error fetching user bio:", error);
        throw new Error("Failed to fetch user bio");
    }
}

export const getRecipesCount = async (Id) => {
    try {
        const count = await db.recipe.count({
            where: { userId: Id },
        });
        return count;
    } catch (error) {
        console.error("Error fetching recipes count:", error);
        throw new Error("Failed to fetch recipes count");
    }
}

export const saveProfilePicture = async (imgUrl, userId) => {
  try {
    const user = await db.user.update({
      where: { id: userId },
      data: { image: imgUrl },
    });
    return user;
  } catch (error) {
    console.error("Error saving profile picture:", error);
    throw new Error("Failed to save profile picture");
  }
};