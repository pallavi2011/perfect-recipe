"use server"

   
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/prisma";
import { SignupSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const signUp = async (formData) => {
    const validatedData = SignupSchema.safeParse(formData);

    if(!validatedData.success) {
        return {
            error: "Invalid data",
        }
    }

    const { name, email, password } = validatedData.data;

    // Check if user already exists

    const existingUser = await getUserByEmail(email);

    if(existingUser) {
        return {
            error: "User already exists",
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.user.create({
            data: {
                name,
                email,
                password:hashedPassword
            }
        })

        //send email verification link

        const verificationToken = await generateVerificationToken(email);
        await sendVerificationEmail(verificationToken.email, verificationToken.token);



     return {success: "Confirmation email sent!"};
    
}