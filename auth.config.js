import Credentials from 'next-auth/providers/credentials';
import { SignInSchema } from '@/schemas';
import { getUserByEmail } from './data/user';
import bcrypt from 'bcryptjs';
import Google from 'next-auth/providers/google';

 
export default { 
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            async authorize(credentials, req) {
                const validatedFields = SignInSchema.safeParse(credentials)
                if (validatedFields.success) {
                   const { email, password } = validatedFields.data;

                   const user = await getUserByEmail(email);
                   if(!user || !user.password){
                       return null
                   }
                
                   const passwordMatch = await bcrypt.compare(password,user.password);

                    if(passwordMatch){
                        return user;
                    }
                }
                return null
            }
        })
               
    ] } 