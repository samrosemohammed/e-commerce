import { adminRouter } from "./routers/admin";
import { authRouter } from "./routers/auth";
import { paymentRouter } from "./routers/payment";
import { userRouter } from "./routers/user";
import { router } from "./trpc";

export const appRouter = router({
  authRouter,
  adminRouter,
  userRouter,
  paymentRouter,
});
export type AppRouter = typeof appRouter;
