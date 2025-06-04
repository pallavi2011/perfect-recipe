"use server"

import { db } from "@/lib/prisma";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";  



export const newVerification = async (token) => {
    const existingToken = await getVerificationTokenByToken(token);

    if(!existingToken) {
        return {
            error: "Invalid token",
        }
    }

    const hasExpired = new Date(existingToken.expires) < new Date();
    if(hasExpired) {
        return {
            error: "Token has expired",
        }
    }
    const user = await getUserByEmail(existingToken.email);

    if(!user) {
        return {
            error: "User not found",
        }
    }

    await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date(),
            email: existingToken.email,
         },
    });

    await db.verificationToken.delete({
        where: { id: existingToken.id },
    }
    )

    return { success: "Email verified successfully" };
}
