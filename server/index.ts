import { authRouter } from "./routers/auth";
import { router } from "./trpc";

export const appRouter = router({
  authRouter,
});
export type AppRouter = typeof appRouter;
