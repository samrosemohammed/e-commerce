import { protectedProcedure, publicProcedure, router } from "../trpc";
import {
  brandSchema,
  categorySchema,
  productSchema,
  updateBrandSchema,
  updateCategorySchema,
} from "@/lib/zodSchemas";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const adminRouter = router({
  createProduct: protectedProcedure
    .input(productSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      console.log("Input recieved in the backend: ", input);
      const preparedData = {
        name: input.productName,
        code: input.productCode?.trim() === "" ? null : input.productCode,
        description:
          input.productDescription?.trim() === ""
            ? null
            : input.productDescription,
        price: input.productPrice,
        cost: input.productCost ?? null,
        comparePrice: input.productComparePrice ?? null,
        categoryId: input.productCategoryId,
        brandId: input.productBrandId, // Note: your model has brandId non-optional? If nullable, use null here
        material:
          input.productMaterial?.trim() === "" ? null : input.productMaterial,
        gender: input.gender?.trim() === "" ? null : input.gender,
        sizes: input.productSizes ?? [],
        colors: input.productColors ?? [],
        stockQuantity: input.productStockQuantity ?? null,
        weight: input.productWeight ?? null,
        tags: input.productTags ?? [],
        status: input.productStatus,
        images: input.productImages ?? [],
        createdById: userId,
      };
      const product = await prisma.product.create({
        data: preparedData,
      });
      return product;
    }),
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
  createBrand: protectedProcedure
    .input(brandSchema)
    .mutation(async ({ ctx, input }) => {
      const { brands } = input;
      const userId = ctx.user.id;

      const created = await prisma.brand.createMany({
        data: brands.map((name) => ({
          name: name.toLowerCase(),
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
  getBrands: protectedProcedure.query(async ({ ctx }) => {
    return prisma.brand.findMany({
      where: { createdById: ctx.user.id },
      orderBy: { name: "asc" },
    });
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
  deleteBrands: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input }) => {
      console.log("Deleting brands with IDs:", input.ids); // DEBUG
      const deleted = await prisma.brand.deleteMany({
        where: { id: { in: input.ids } },
      });
      return deleted;
    }),
  deleteProduct: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      const deleted = await prisma.product.deleteMany({
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
  updateBrand: protectedProcedure
    .input(updateBrandSchema)
    .mutation(async ({ input }) => {
      const { id, name, status } = input;
      return prisma.brand.update({
        where: { id },
        data: { name: name.toLowerCase(), status },
      });
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
