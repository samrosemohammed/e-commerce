import { prisma } from "@/lib/prisma";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import z from "zod";
import {
  filterInputSchema,
  orderSchema,
  updateProfileSchema,
} from "@/lib/zodSchemas";

export const userRouter = router({
  updateUser: protectedProcedure
    .input(updateProfileSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.user.id;

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          name: input.fullName,
          email: input.email,
          phone: input.phone,
          location: input.location,
          bio: input.bio,
        },
      });

      return updatedUser;
    }),
  getUser: protectedProcedure.query(async ({ input, ctx }) => {
    const userId = ctx.user.id;
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    return user;
  }),
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
  // In your userRouter or create a new filterRouter
  getFilters: publicProcedure.query(async () => {
    const categories = await prisma.category.findMany({
      where: { status: "active" },
      select: { name: true },
    });

    const brands = await prisma.brand.findMany({
      where: { status: "active" },
      select: { name: true },
    });

    const genders = await prisma.product.findMany({
      select: { gender: true },
      distinct: ["gender"],
    });

    const availability = await prisma.product.findMany({
      select: { status: true },
      distinct: ["status"],
    });

    const priceStats = await prisma.product.aggregate({
      _min: { price: true },
      _max: { price: true },
    });

    // Fetch all tags from all products
    const allProductTags = await prisma.product.findMany({
      select: { tags: true },
    });

    const tagSet = new Set<string>();
    allProductTags.forEach((product) => {
      product.tags.forEach((tag) => tagSet.add(tag));
    });

    return {
      categories: categories.map((c) => c.name),
      brands: brands.map((b) => b.name),
      genders: genders.map((g) => g.gender).filter(Boolean),
      availability: availability.map((a) => a.status),
      priceRange: [priceStats._min.price ?? 0, priceStats._max.price ?? 1000],
      tags: Array.from(tagSet), // Add this
    };
  }),
  getFilteredProducts: publicProcedure
    .input(filterInputSchema)
    .query(async ({ input }) => {
      const {
        categories,
        brands,
        genders,
        tags,
        availability,
        priceMin,
        priceMax,
        sortBy = "default",
      } = input;

      // Build where clause dynamically
      const whereClause: any = {};

      // Category filter
      if (categories && categories.length > 0) {
        whereClause.category = {
          name: { in: categories },
        };
      }

      // Brand filter
      if (brands && brands.length > 0) {
        whereClause.brand = {
          name: { in: brands },
        };
      }

      // Gender filter
      if (genders && genders.length > 0) {
        whereClause.gender = { in: genders };
      }

      // Tags filter (array contains any of the selected tags)
      if (tags && tags.length > 0) {
        whereClause.tags = {
          hasSome: tags,
        };
      }

      // Availability filter
      if (availability && availability.length > 0) {
        whereClause.status = { in: availability };
      }

      // Price range filter
      if (priceMin !== undefined || priceMax !== undefined) {
        whereClause.price = {};
        if (priceMin !== undefined) whereClause.price.gte = priceMin;
        if (priceMax !== undefined) whereClause.price.lte = priceMax;
      }

      // Build orderBy clause
      let orderBy: any = { name: "asc" }; // default

      switch (sortBy) {
        case "price-asc":
          orderBy = { price: "asc" };
          break;
        case "price-desc":
          orderBy = { price: "desc" };
          break;
        case "name-asc":
          orderBy = { name: "asc" };
          break;
        case "name-desc":
          orderBy = { name: "desc" };
          break;
        default:
          orderBy = { name: "asc" };
      }

      const products = await prisma.product.findMany({
        where: whereClause,
        orderBy,
        include: {
          brand: { select: { name: true } },
          category: { select: { name: true } },
        },
      });

      return products;
    }),
});
