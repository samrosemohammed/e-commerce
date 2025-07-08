import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

// import CredentialsProvider from "next-auth/providers/credentials"; // For email/password

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
