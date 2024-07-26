import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

console.log('process.env.GOOGLE_CLIENT_ID', process.env.GOOGLE_CLIENT_ID)
export const NEXT_AUTH_CONFIG = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'email', type: 'text', placeholder: '' },
                password: { label: 'password', type: 'password', placeholder: '' },
            },
            async authorize(credentials: any) {

                return {
                    id: "user1",
                    name: "asd",
                    userId: "asd",
                    email: "ramdomEmail"
                };
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || ""
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        //jwt of no such use in FE and BE what we are getting is from the session callback
        jwt: async ({ user, token }: any) => {
            if (user) {
                token.uid = user.id;
            }
            return token;
        },
        session: ({ session, token, user }: any) => {
            if (session.user) {
                session.user.id = token.uid
            }
            return session
        }
    },
}