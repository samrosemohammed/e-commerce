import { colorNames, sizes, status } from "@/types/product";
import { z } from "zod";
export const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    email: z.email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(100, { message: "Password is too long" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type SignupFormData = z.infer<typeof signupSchema>;

export const categorySchema = z.object({
  categories: z
    .array(z.string().min(1, "Category name is required"))
    .min(1, "At least one category is required"),
});

export type CategoryFormData = z.infer<typeof categorySchema>;

export const updateCategorySchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  status: z.enum(["active", "inactive"]),
});
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;

export const brandSchema = z.object({
  brands: z
    .array(z.string().min(1, "Category name is required"))
    .min(1, "At least one category is required"),
});
export type BrandFormData = z.infer<typeof brandSchema>;

export const updateBrandSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  status: z.enum(["active", "inactive"]),
});
export type UpdateBrandInput = z.infer<typeof updateBrandSchema>;

export const productSchema = z.object({
  productName: z
    .string()
    .min(1, "At least one character")
    .max(50, "Limit exceed"),
  productCode: z.string().optional(),
  productDescription: z.string().optional(),
  productPrice: z.coerce.number().positive("Must be a positive number"),
  productCost: z.coerce
    .number()
    .positive("Must be a positive number")
    .optional(),
  productComparePrice: z.coerce
    .number()
    .positive("Must be a positive number")
    .optional(),

  productCategoryId: z.string({ error: "Category is required" }),
  productBrandId: z.string({ error: "Brand is required" }),
  productMaterial: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .refine((val) => val === undefined || val.length >= 2, {
      message: "At least 2 Character",
    })
    .optional(),
  gender: z.string({ error: "Gender is required" }),
  productSizes: z
    .array(z.enum(sizes))
    .min(1, "At least one size must be selected"),
  productColors: z
    .array(z.enum(colorNames))
    .min(1, "At least one color must be selected"),
  productStockQuantity: z.coerce
    .number()
    .positive("Must be a positive number")
    .optional(),

  productWeight: z.coerce
    .number()
    .positive("Weight must be a positive number")
    .optional(),

  productTags: z.array(z.string().min(1, "Tags cannot be empty")).optional(),
  productStatus: z.enum(status),
  productImages: z.array(z.string().url()).optional(),
});
export type ProductFormData = z.infer<typeof productSchema>;
