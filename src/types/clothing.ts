export interface ClothingProduct {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  colors: string[];
  sizes: string[];
  material: string;
  style: string;
  gender: string;
  inStock: boolean;
  isNew: boolean;
  isSale: boolean;
  tags: string[];
}

export interface FilterState {
  searchTerm: string;
  selectedCategories: string[];
  selectedBrands: string[];
  selectedColors: string[];
  selectedSizes: string[];
  selectedMaterials: string[];
  selectedStyles: string[];
  selectedGenders: string[];
  priceRange: [number, number];
  minRating: number;
  showInStockOnly: boolean;
  showNewOnly: boolean;
  showSaleOnly: boolean;
  sortBy: string;
  viewMode: "grid" | "list";
}
