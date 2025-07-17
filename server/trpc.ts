import { initTRPC } from "@trpc/server";
import { Context } from "./context";
const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new Error("UNAUTHORIZED");
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.session.user, // Optional: makes user accessible directly
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
