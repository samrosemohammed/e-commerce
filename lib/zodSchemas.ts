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
  productCost: z
    .preprocess((val) => {
      if (val === "" || val === null || val === undefined) return undefined;
      return Number(val);
    }, z.number().positive("Must be a positive number").optional())
    .optional(),
  productComparePrice: z
    .preprocess((val) => {
      if (val === "" || val === null || val === undefined) return undefined;
      return Number(val);
    }, z.number().positive("Must be a positive number").optional())
    .optional(),
  productCategoryId: z.string({ error: "Category is required" }),
  productBrandId: z.string().optional(),
  productMaterial: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .refine((val) => val === undefined || val.length >= 2, {
      message: "At least 2 Character",
    })
    .optional(),
  gender: z.string({ error: "Gender is required" }).optional(),
  productSizes: z.array(z.enum(sizes)).optional(),
  productColors: z.array(z.enum(colorNames)).optional(),
  productStockQuantity: z
    .preprocess((val) => {
      if (val === "" || val === null || val === undefined) return undefined;
      return Number(val);
    }, z.number().positive("Must be a positive number").optional())
    .optional(),

  productWeight: z
    .preprocess((val) => {
      if (val === "" || val === null || val === undefined) return undefined;
      return Number(val);
    }, z.number().positive("Must be a positive number").optional())
    .optional(),

  productTags: z.array(z.string()).optional(),
  productStatus: z.enum(status),
  productImages: z.array(z.string().url()).optional(),
});
export type ProductFormData = z.infer<typeof productSchema>;

export const orderSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Phone number is too short"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  province: z.string().optional(),
  zip: z.string().min(4, "Zip code is too short"),
  paymentMethod: z.enum(["cash", "esewa"]),
});

export type OrderFormData = z.infer<typeof orderSchema>;

const orderProductSchema = z.object({
  productId: z.string(),
  name: z.string(),
  quantity: z.number().int().positive(),
  selectedSize: z.string().optional().nullable(),
  selectedColor: z.string().optional().nullable(),
  price: z.number().nonnegative(),
  total: z.number().nonnegative(),
});

const orderSummarySchema = z.object({
  items: z.number().int().nonnegative(),
  cartTotal: z.number().nonnegative(),
  shipping: z.number().nonnegative(),
  tax: z.number().nonnegative(),
  finalTotal: z.number().nonnegative(),
});

export const extendedOrderSchema = orderSchema.extend({
  products: z.array(orderProductSchema),
  summary: orderProductSchema,
});
