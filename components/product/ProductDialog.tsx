"use client";

import * as React from "react";
import { Plus, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/server/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProductFormData, productSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Color, Size } from "@/types/product";

const categories = [
  "T-Shirts",
  "Shirts",
  "Pants",
  "Jeans",
  "Dresses",
  "Skirts",
  "Jackets",
  "Sweaters",
  "Hoodies",
  "Shorts",
  "Activewear",
  "Underwear",
  "Accessories",
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

const colors = [
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
];

export const ProductDialog = () => {
  const [open, setOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<Size[]>([]);
  const [selectedColors, setSelectedColors] = useState<Color[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const { data: categoriesData } = trpc.adminRouter.getCategories.useQuery();
  const { data: brandsData } = trpc.adminRouter.getBrands.useQuery();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const handleSizeToggle = (size: Size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleColorToggle = (color: Color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleImageUpload = () => {
    // Simulate image upload
    const newImage = `/placeholder.svg?height=200&width=200`;
    setImages([...images, newImage]);
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<ProductFormData> = (data: ProductFormData) => {
    console.log("Submitted Product Data:", data);
    // setOpen(false);
  };
  // Sync controlled values to RHF
  useEffect(() => {
    setValue("sizes", selectedSizes);
    setValue("colors", selectedColors);
    setValue("tags", tags);
    setValue("images", images);
  }, [selectedSizes, selectedColors, tags, images]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[950px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
          <DialogDescription>
            Add a new clothing item to your store inventory.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Product Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="e.g., Classic Cotton T-Shirt"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-destructive">{errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    {...register("sku")}
                    id="sku"
                    placeholder="e.g., TSH-001-BLK-M"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your product features, materials, fit, and care instructions..."
                  className="min-h-[100px]"
                  {...register("description")}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">
                    Price <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="29.99"
                    {...register("price")}
                  />
                  {errors.price && (
                    <p className="text-destructive">{errors.price.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="compare-price">Compare at Price</Label>
                  <Input
                    id="compare-price"
                    type="number"
                    step="0.01"
                    placeholder="39.99"
                    {...register("compareAtPrice")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost">Cost per Item</Label>
                  <Input
                    id="cost"
                    type="number"
                    step="0.01"
                    placeholder="15.00"
                    {...register("cost")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">
                    Category <span className="text-destructive">*</span>
                  </Label>
                  <Select onValueChange={(val) => setValue("category", val)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 overflow-y-auto">
                      {categoriesData?.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.name}
                          className="capitalize"
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-destructive">
                      {errors.category.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Select onValueChange={(val) => setValue("brand", val)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {brandsData?.map((brand) => (
                        <SelectItem
                          key={brand.id}
                          value={brand.name}
                          className="capitalize"
                        >
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="material">Material</Label>
                  <Input id="material" placeholder="e.g., 100% Cotton" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">
                    Gender <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    onValueChange={(val) =>
                      setValue(
                        "gender",
                        val as "unisex" | "men" | "women" | "kids"
                      )
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unisex">Unisex</SelectItem>
                      <SelectItem value="men">Men</SelectItem>
                      <SelectItem value="women">Women</SelectItem>
                      <SelectItem value="kids">Kids</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <p className="text-destructive">{errors.gender.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Variants */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Product Variants</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Sizes */}
              <div className="space-y-2">
                <Label>Available Sizes</Label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <div key={size} className="flex items-center space-x-2">
                      <Checkbox
                        id={`size-${size}`}
                        checked={selectedSizes.includes(size as Size)}
                        onCheckedChange={() => handleSizeToggle(size as Size)}
                      />
                      <Label
                        htmlFor={`size-${size}`}
                        className="text-sm font-normal"
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="space-y-2">
                <Label>Available Colors</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {colors.map((color) => (
                    <div
                      key={color.name}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`color-${color.name}`}
                        checked={selectedColors.includes(color.name as Color)}
                        onCheckedChange={() =>
                          handleColorToggle(color.name as Color)
                        }
                      />
                      <div
                        className="w-4 h-4 rounded border border-gray-300"
                        style={{ backgroundColor: color.value }}
                      />
                      <Label
                        htmlFor={`color-${color.name}`}
                        className="text-sm font-normal"
                      >
                        {color.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Product Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Product ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="h-32 border-dashed bg-transparent"
                  onClick={handleImageUpload}
                >
                  <Upload className="w-6 h-6 mb-2" />
                  <span className="text-sm">Upload Image</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Inventory & SEO */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Inventory & SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Stock Quantity</Label>
                  <Input id="quantity" type="number" placeholder="100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.01"
                    placeholder="0.25"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="px-2 py-1">
                      {tag}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="ml-1 h-auto p-0"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add a tag..."
                  />
                  <Button type="button" onClick={handleAddTag}>
                    Add
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue="draft">
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button type="submit">Create Product</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
