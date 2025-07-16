import type { DefaultSession, DefaultUser } from "next-auth";
import type { JWT as DefaultJWT } from "next-auth/jwt";

type UserId = string;
type UserRole = "admin" | "user";

declare module "next-auth" {
  interface Session {
    user: {
      id: UserId;
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: UserId;
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: UserId;
    role: UserRole;
  }
}

export type FixLinterWarnings = UserId | UserRole;
