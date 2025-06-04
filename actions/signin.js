"use server"

   
import { SignInSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";
import { getUserByEmail } from "@/data/user";

export const login = async (formData) => {
    const validatedData = SignInSchema.safeParse(formData);

    if(!validatedData.success) {
        return {
            error: "Invalid data",
        }
    }
     const { email, password } = validatedData.data;

     const existingUser = await getUserByEmail(email);

     if(!existingUser || !existingUser.email || !existingUser.password) {
        return {
            error: "User not found",
        }
     }

     if(!existingUser.emailVerified) {
        let verificationToken = await generateVerificationToken(email);

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        )
       
     }

    
  
     try {
        await signIn("credentials", {
            email,
            password,
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
        });
     } catch (error) {
        if(error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        error: "Invalid credentials",
                    }
                case "OAuthCallbackError":
                    return {
                        error: "Invalid OAuth callback",
                    }
                default:
                    return {
                        error: "Something went wrong",
                    }
            }
        }
     }
    
}