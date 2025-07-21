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

export const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"] as const;
export type Size = (typeof sizes)[number];

export const colors = [
  "Black",
  "White",
  "Gray",
  "Navy",
  "Red",
  "Blue",
  "Green",
  "Pink",
  "Purple",
  "Brown",
  "Beige",
  "Yellow",
] as const;
export type Color = (typeof colors)[number];
