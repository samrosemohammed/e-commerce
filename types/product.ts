import { AppRouter } from "@/server";
import { inferRouterOutputs } from "@trpc/server";

export type Gender = "unisex" | "men" | "women" | "kids";

export const genders: { value: Gender; label: string }[] = [
  { value: "unisex", label: "Unisex" },
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
  { value: "kids", label: "Kids" },
];

export const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
export type Size = (typeof sizes)[number]; // optional, for better TypeScript support

export const colors = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#FFFFFF" },
  { name: "Gray", value: "#808080" },
  { name: "Navy", value: "#000080" },
  { name: "Red", value: "#FF0000" },
  { name: "Blue", value: "#0000FF" },
  { name: "Green", value: "#008000" },
  { name: "Pink", value: "#FFC0CB" },
  { name: "Purple", value: "#800080" },
  { name: "Brown", value: "#A52A2A" },
  { name: "Beige", value: "#F5F5DC" },
  { name: "Yellow", value: "#FFFF00" },
] as const;

export type ColorName = (typeof colors)[number]["name"];
export const colorNames = colors.map((c) => c.name) as ColorName[];

export const status = ["Draft", "Active", "Archived"];

export type AdminProduct = {
  id: string;
  name: string;
  code?: string;
  price: number;
  cost?: number;
  category: {
    name: string;
  };
  brand?: {
    name: string;
  };
  gender?: string;
  stockQuantity?: number;
  status: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  createdById: string;
};

export type Product =
  inferRouterOutputs<AppRouter>["adminRouter"]["getProductById"];
