
import { db } from "@/lib/prisma";

export const getPasswordResetToken = async (token) => {
    try {
        const passwordResetToken = await db.passwordResetToken.findUnique({
            where: {
                token: token,
            },
        });

        return passwordResetToken
    } catch (error) {
        
    }
}

export const getPasswordResetTokenByEmail = async (email) => {
    try {
        const passwordResetToken = await db.passwordResetToken.findFirst({
            where: {
                email,
            },
        });

        return passwordResetToken
    } catch (error) {
        
    }
}