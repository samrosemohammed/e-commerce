import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function createContext() {
  const session = await getServerSession(authOptions); // uses built-in cookie/session

  return {
    session,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
