
import Link from "next/link";

const AuthError = () =>{
    return(
        <div>
            <h1>OOps!! Something went wrong. Please try again later.</h1>
            <Link href="/sign-in" className="cursor-pointer">Back to Login</Link>
        </div>
    )
}

export default AuthError;