import { protectedProcedure, router } from "../trpc";
import { categorySchema } from "@/lib/zodSchemas";
import { prisma } from "@/lib/prisma";

export const adminRouter = router({
  createCategory: protectedProcedure
    .input(categorySchema)
    .mutation(async ({ ctx, input }) => {
      const { categories } = input;
      const userId = ctx.user.id;

      const created = await prisma.category.createMany({
        data: categories.map((name) => ({
          name,
          createdById: userId,
        })),
        skipDuplicates: true, // avoids duplicate insertion
      });

      return created;
    }),
});
