import { z } from "zod";
export const registrationSellerSchema = z
  .object({
    storeName: z
      .string()
      .min(3, { message: "Store name must be at least 3 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
    phoneNumber: z
      .string()
      .min(10, { message: "Please enter a valid phone number" }),
    storeType: z.string().min(1, { message: "Please select a store type" }),
    address: z.string().min(5, { message: "Please enter your store address" }),
    city: z.string().min(2, { message: "Please enter your city" }),
    state: z.string().min(2, { message: "Please enter your state/province" }),
    zipCode: z
      .string()
      .min(5, { message: "Please enter a valid zip/postal code" }),
    country: z.string().min(2, { message: "Please enter your country" }),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SellerRegistrationFormValues = z.infer<
  typeof registrationSellerSchema
>;

export const loginSellerSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  rememberMe: z.boolean().optional(),
});

export type SellerLoginFormValues = z.infer<typeof loginSellerSchema>;
