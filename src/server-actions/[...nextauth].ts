import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import VercelWrapper from "@/src/server-actions/services/vercel-wrapper";

export const CredProviderConfig = {
    async authorize(credentials: any) {
        const parsedCredentials = z
            .object({email: z.string().email(), password: z.string().min(6)})
            .safeParse(credentials);
        if (parsedCredentials.success) {
            const {email, password} = parsedCredentials.data;
            const user = await VercelWrapper.getUserByEmail(email);
            if (!user) return null;
            const passwordsMatch = await bcrypt.compare(password, user.password);

            if (passwordsMatch) return user as any;
        }
        console.log('Invalid credentials');
        return null;
    }
}

export const CredProvider = Credentials(CredProviderConfig)

export const nextAuthConfig = {
    ...authConfig,
    providers: [CredProvider],
}

export const sessionHandler = NextAuth(nextAuthConfig);
const auth = sessionHandler.auth
const signIn = sessionHandler.signIn
const GET = sessionHandler.handlers.GET
const POST = sessionHandler.handlers.POST
const signOut = sessionHandler.signOut
const update  = sessionHandler.unstable_update

export { auth, signIn, signOut, GET, POST, update  }

