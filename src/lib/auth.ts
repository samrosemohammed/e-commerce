import GitHubProvider from "next-auth/providers/github";
export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    // Uncomment and configure for credentials:
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "Email", type: "email" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     // Add your own logic here to find the user
    //     if (credentials?.email === "demo@demo.com" && credentials?.password === "demo") {
    //       return { id: "1", name: "Demo User", email: "demo@demo.com" };
    //     }
    //     return null;
    //   },
    // }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    signIn: "/seller", // Custom sign-in page
  },
};
