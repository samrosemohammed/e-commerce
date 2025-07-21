import { colors, sizes } from "@/types/product";
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
  name: z.string().min(1, "Product name is required"),
  sku: z.string().optional(),
  description: z.string().optional(),
  price: z.coerce.number().gt(0, "Price must be greater than 0"),
  compareAtPrice: z.coerce.number().nonnegative().optional(),
  cost: z.coerce.number().nonnegative().optional(),
  category: z.string().min(1, "Category is required"),
  brand: z.string().optional(),
  material: z.string().optional(),
  gender: z.enum(["unisex", "men", "women", "kids"]),
  sizes: z.array(z.enum(sizes)).optional(),
  colors: z.array(z.enum(colors)).optional(),
  images: z.array(z.string().url()).optional(),
  quantity: z.coerce.number().int().nonnegative().optional(),
  weight: z.coerce.number().nonnegative().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(["draft", "active", "archived"]).default("draft"),
});

export type ProductFormData = z.infer<typeof productSchema>;
