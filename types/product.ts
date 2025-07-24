export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Classic White T-Shirt",
    price: 25.0,
    imageUrl: "/placeholder.svg?height=200&width=200",
    description:
      "A timeless classic, perfect for any occasion. Made from 100% premium cotton.",
  },
  {
    id: "2",
    name: "Slim Fit Jeans",
    price: 65.0,
    imageUrl: "/placeholder.svg?height=200&width=200",
    description:
      "Comfortable and stylish slim fit jeans, ideal for everyday wear.",
  },
  {
    id: "3",
    name: "Elegant Summer Dress",
    price: 89.99,
    imageUrl: "/placeholder.svg?height=200&width=200",
    description:
      "Lightweight and breathable dress, perfect for warm summer days.",
  },
  {
    id: "4",
    name: "Cozy Knit Sweater",
    price: 55.5,
    imageUrl: "/placeholder.svg?height=200&width=200",
    description: "Soft and warm knit sweater, a must-have for cooler evenings.",
  },
  {
    id: "5",
    name: "Sporty Sneakers",
    price: 79.0,
    imageUrl: "/placeholder.svg?height=200&width=200",
    description:
      "High-performance sneakers designed for comfort and durability.",
  },
  {
    id: "6",
    name: "Leather Crossbody Bag",
    price: 120.0,
    imageUrl: "/placeholder.svg?height=200&width=200",
    description:
      "Stylish and practical leather bag, perfect for carrying your essentials.",
  },
  {
    id: "4",
    name: "Cozy Knit Sweater",
    price: 55.5,
    imageUrl: "/placeholder.svg?height=200&width=200",
    description: "Soft and warm knit sweater, a must-have for cooler evenings.",
  },
  {
    id: "5",
    name: "Sporty Sneakers",
    price: 79.0,
    imageUrl: "/placeholder.svg?height=200&width=200",
    description:
      "High-performance sneakers designed for comfort and durability.",
  },
  {
    id: "6",
    name: "Leather Crossbody Bag",
    price: 120.0,
    imageUrl: "/placeholder.svg?height=200&width=200",
    description:
      "Stylish and practical leather bag, perfect for carrying your essentials.",
  },
];

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
