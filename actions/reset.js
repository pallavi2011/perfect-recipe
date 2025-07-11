"use server";

import * as z from "zod";
import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/token";

export const reset = async(data) => {
    const validatedFields = ResetSchema.safeParse(data);

    if(!validatedFields.success) {
        return {
            error: "Invalid email address",
            
        }
    }

    const {email} = validatedFields.data;

    const existingUser = await getUserByEmail(email);   

    if(!existingUser) {
        return {
            error: "Email not found",
            
        }
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(
        passwordResetToken.email, 
        passwordResetToken.token);
    return {
        success:"Reset link sent to your email"
    }

    // Send email with reset link

}