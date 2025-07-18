import { protectedProcedure, router } from "../trpc";
import { categorySchema, updateCategorySchema } from "@/lib/zodSchemas";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const adminRouter = router({
  createCategory: protectedProcedure
    .input(categorySchema)
    .mutation(async ({ ctx, input }) => {
      const { categories } = input;
      const userId = ctx.user.id;

      const created = await prisma.category.createMany({
        data: categories.map((name) => ({
          name: name.toLowerCase(), // store lowercase
          createdById: userId,
        })),
        skipDuplicates: true,
      });

      return created;
    }),
  getCategories: protectedProcedure.query(async ({ ctx }) => {
    const categories = await prisma.category.findMany({
      where: {
        createdById: ctx.user.id, // Optional: filter categories created by this user
      },
      orderBy: {
        name: "asc", // Optional: sort alphabetically
      },
    });

    return categories;
  }),
  deleteCategories: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input }) => {
      const deleted = await prisma.category.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
      return deleted;
    }),
  updateCategory: protectedProcedure
    .input(updateCategorySchema)
    .mutation(async ({ input }) => {
      const { id, name, status } = input;
      return prisma.category.update({
        where: { id },
        data: {
          name: name.toLowerCase(),
          status,
        },
      });
    }),
});
