import { prisma } from "@/lib/prisma";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import z from "zod";
import { orderSchema } from "@/lib/zodSchemas";

export const userRouter = router({
  getProductById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      console.log("id", input);
      const product = await prisma.product.findUnique({
        where: {
          id: input.id,
        },
        include: {
          brand: {
            select: { name: true },
          },
          category: {
            select: { name: true },
          },
        },
      });

      if (!product) throw new TRPCError({ code: "NOT_FOUND" });

      return product;
    }),

  getProduct: publicProcedure.query(async () => {
    const products = await prisma.product.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        brand: {
          select: {
            name: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    return products;
  }),
});
