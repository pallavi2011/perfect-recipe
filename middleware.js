import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { NextResponse } from "next/server"
import {
    authRoutes,
    publicRoutes,
    apiAuthPrefix,
    DEFAULT_LOGIN_REDIRECT
} from '@/routes';

const { auth } = NextAuth(authConfig)

export default auth((req) =>{
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;
   

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    //Below order matters hence dont change it

    if(isApiAuthRoute){
        return null;
    }

    if(isAuthRoute){
        if(isLoggedIn){
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return null;
    }

    if(!isLoggedIn && !isPublicRoute ){
        return NextResponse.redirect(new URL("/sign-in", nextUrl))
    }

    return null;


})

export const config = {
    matcher:['/((?!.+\\.[\\w]+$|_next).*)','/','/(api|trpc)(.*)']
}