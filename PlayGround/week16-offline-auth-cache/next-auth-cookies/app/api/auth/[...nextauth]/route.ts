import { NEXT_AUTH_CONFIG } from '@/lib/auth';
import { Session } from 'inspector';
import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth(NEXT_AUTH_CONFIG)

export { handler as GET, handler as POST }