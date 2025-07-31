import { prisma } from "@/lib/prisma";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import z from "zod";
import { orderSchema } from "@/lib/zodSchemas";

export const userRouter = router({
  createOrder: protectedProcedure
    .input(orderSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.user.id;
      console.log(input);
      // Destructure input
      const {
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        province,
        zip,
        paymentMethod,
        products,
        summary,
      } = input;

      // Step 1: Create the order
      const order = await prisma.order.create({
        data: {
          userId,
          firstName,
          lastName,
          email,
          phone,
          address,
          city,
          province,
          zip,
          paymentMethod,
          cartTotal: summary.cartTotal,
          shipping: summary.shipping,
          tax: summary.tax,
          finalTotal: summary.finalTotal,
          status: "pending",
          items: {
            create: products.map((product) => ({
              name: product.name,
              quantity: product.quantity,
              price: product.price,
              selectedSize: product.selectedSize ?? "",
              selectedColor: product.selectedColor ?? "",
              total: product.total,
              product: {
                connect: { id: product.productId },
              },
            })),
          },
        },
        include: {
          items: true, // Optional: include order items in response
        },
      });

      return order;
    }),
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

  getOrder: protectedProcedure.query(async ({ input, ctx }) => {
    const userId = ctx.user.id;
    const order = await prisma.order.findMany({
      where: {
        userId: userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    return order;
  }),
});
