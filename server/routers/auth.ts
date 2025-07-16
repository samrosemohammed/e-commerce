import { signupSchema } from "@/lib/zodSchemas";
import { publicProcedure, router } from "../trpc";
import { prisma } from "@/lib/prisma";
import { TRPCError } from "@trpc/server";
import { hashPassword } from "@/lib/utils";

export const authRouter = router({
  signup: publicProcedure.input(signupSchema).mutation(async ({ input }) => {
    const existingUser = await prisma.user.findUnique({
      where: { email: input.email },
    });
    if (existingUser)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Email already in use",
      });
    const hashedPassword = await hashPassword(input.password, 10);
    const user = await prisma.user.create({
      data: {
        email: input.email,
        hashedPassword,
      },
    });
    return { sucess: true, userId: user.id };
  }),
});
