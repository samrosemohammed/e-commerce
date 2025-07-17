import { adminRouter } from "./routers/admin";
import { authRouter } from "./routers/auth";
import { router } from "./trpc";

export const appRouter = router({
  authRouter,
  adminRouter,
});
export type AppRouter = typeof appRouter;
