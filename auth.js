import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import authConfig from "./auth.config"
import { db } from "./lib/prisma"
import { getUserById } from "@/data/user"

 
const prisma = new PrismaClient()
 
export const { auth, handlers:{GET, POST}, signIn, signOut } = NextAuth({
  pages:{
    signIn: "/sign-in",
    signOut: "/sign-out",
    error: "/error"
    
  },
  events:{
    async linkAccount({user}){
    
       await db.user.update({
         where:{id: user.id},
         data:{emailVerified: new Date()}
 
       })
     }
     
    },
  callbacks:{
    async signIn({user, account}) {
      if(account?.provider !== "credentials") return true
      
      const existingUser = await getUserById(user.id);

      //prevent sign in if user is not email verified
      if(!existingUser.emailVerified) {
        return false
      }


      return true
    
  },
    async session({token, session}){
     if(token.sub && session.user){
      session.user.id = token.sub
     }
     console.log("Session", session);
      return session
    },
      
    async jwt({token}) {
     if(!token.sub) return token;
     const existingUser = await getUserById(token.sub);
     if(!existingUser){
      return token
     }
    return token

    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})