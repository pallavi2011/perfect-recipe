/**
 * An array of public routes that do not require authentication.
 */

export const publicRoutes = [
    "/",
    "/new-verification",
    "/recipes"
    
]

/**
 * An array of protected routes that are used for authentication.
 */
export const authRoutes = [
"/sign-in",
"/sign-up",
"/error",
"/reset",
"/new-password"

]

export const apiAuthPrefix = "/api/auth/"


/**
 *Default redirect path after login.
 * 
 */
export const DEFAULT_LOGIN_REDIRECT = "/"