"use server"

import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetToken } from "@/data/passwordresettoken";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs"
import { db } from "@/lib/prisma";

export const newPassword = async (values, token) => {
    if(!token) {
        return { error: "Missing token" };
    }

    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields"};
    }

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetToken(token)

    if(!existingToken) {
        return { error: "Invalid token" };
    }

    const tokenExpired = new Date(existingToken.expires) < new Date();

    if(tokenExpired) {
        return { error: "Token expired" };
    }

    const existingUser  = await getUserByEmail(existingToken.email);

    if(!existingUser) {
        return { error: "User email does not exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    await db.user.update({
        where:{
            id: existingUser.id
        },
        data: {
            password: hashedPassword
        }
    });

    await db.passwordResetToken.delete({
        where: {
            id: existingToken.id
        }
    });

    return { success: "Password updated successfully" };




}