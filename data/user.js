

import { db } from "@/lib/prisma";

export const getUserByEmail = async (email) => {
    try{
        const user = await db.user.findUnique({
            where: {
                email
            }
        })
    
        return user;
    }
    catch (error) {
        console.error("Error fetching user by email:", error);
        return null;
    }
   
}

export const getUserById = async (id) => {
    try{
        const user = await db.user.findUnique({
            where: {
                id
            }
        })
    
        return user;
    }
    catch (error) {
        console.error("Error fetching user by email:", error);
        return null;
    }
   
}