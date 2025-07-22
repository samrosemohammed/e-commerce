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
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormData, productSchema } from "@/lib/zodSchemas";
import { trpc } from "@/server/client";
import { ColorName, colors, genders, sizes, status } from "@/types/product";
import { capitalizeWords } from "@/lib/utils";

export const ProductDialog = () => {
  const [open, setOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<ColorName[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const { data: categoriesData } = trpc.adminRouter.getCategories.useQuery();
  const { data: brandsData } = trpc.adminRouter.getBrands.useQuery();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleColorToggle = (color: ColorName) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      const updatedTags = [...tags, trimmedTag];
      setTags(updatedTags);
      setValue("productTags", updatedTags); // use updated value
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

  const onSubmit = (data: ProductFormData) => {
    console.log("data: ", data);
  };

  useEffect(() => {
    setValue("productSizes", selectedSizes);
    setValue("productColors", selectedColors);
  }, [selectedSizes, selectedColors, setValue]);

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
                  <Label htmlFor="product-name">Product Name *</Label>
                  <Input
                    id="product-name"
                    placeholder="e.g., Classic Cotton T-Shirt"
                    {...register("productName")}
                  />
                  {errors.productName && (
                    <p className="text-destructive">
                      {errors.productName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-code">SKU</Label>
                  <Input
                    id="product-code"
                    placeholder="e.g., TSH-001-BLK-M"
                    {...register("productCode")}
                  />
                  {errors.productCode && (
                    <p className="text-destructive">
                      {errors.productCode.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-description">Description</Label>
                <Textarea
                  id="product-description"
                  placeholder="Describe your product features, materials, fit, and care instructions..."
                  className="min-h-[100px]"
                  {...register("productDescription")}
                />
                {errors.productDescription && (
                  <p className="text-destructive">
                    {errors.productDescription.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-price">Price *</Label>
                  <Input
                    id="product-price"
                    type="number"
                    step="0.01"
                    placeholder="29.99"
                    {...register("productPrice")}
                  />
                  {errors.productPrice && (
                    <p className="text-destructive">
                      {errors.productPrice.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="produc-compare-price">Compare at Price</Label>
                  <Input
                    id="product-compare-price"
                    type="number"
                    step="0.01"
                    placeholder="39.99"
                    {...register("productComparePrice")}
                  />
                  {errors.productComparePrice && (
                    <p className="text-destructive">
                      {errors.productComparePrice.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-cost">Cost per Item</Label>
                  <Input
                    id="product-cost"
                    type="number"
                    step="0.01"
                    placeholder="15.00"
                    {...register("productCost")}
                  />
                  {errors.productCost && (
                    <p className="text-destructive">
                      {errors.productCost.message}
                    </p>
                  )}
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
                  <Label htmlFor="category">Category *</Label>
                  <Controller
                    control={control}
                    name="productCategoryId"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value ?? ""}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoriesData?.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {capitalizeWords(category.name)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.productCategoryId && (
                    <p className="text-destructive">
                      {errors.productCategoryId.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Controller
                    control={control}
                    name="productBrandId"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value ?? ""}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                        <SelectContent>
                          {brandsData?.map((brand) => (
                            <SelectItem key={brand.id} value={brand.id}>
                              {capitalizeWords(brand.name)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.productBrandId && (
                    <p className="text-destructive">
                      {errors.productBrandId.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-material">Material</Label>
                  <Input
                    {...register("productMaterial")}
                    id="product-material"
                    placeholder="e.g., 100% Cotton"
                  />
                  {errors.productMaterial && (
                    <p className="text-destructive">
                      {errors.productMaterial.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Controller
                    control={control}
                    name="gender"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value ?? ""}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          {genders.map((gender) => (
                            <SelectItem key={gender.value} value={gender.value}>
                              {gender.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
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
                <Controller
                  control={control}
                  name="productSizes"
                  render={({ field }) => (
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((size) => {
                        const isChecked = field.value?.includes(size);

                        return (
                          <div
                            key={size}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`size-${size}`}
                              checked={isChecked}
                              onCheckedChange={() => {
                                const newValue = isChecked
                                  ? field.value.filter(
                                      (s: string) => s !== size
                                    )
                                  : [...(field.value || []), size];
                                field.onChange(newValue);
                              }}
                            />
                            <Label
                              htmlFor={`size-${size}`}
                              className="text-sm font-normal"
                            >
                              {size}
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                  )}
                />
                {errors.productSizes && (
                  <p className="text-destructive text-sm">
                    {errors.productSizes.message as string}
                  </p>
                )}
              </div>

              {/* Colors */}
              <div className="space-y-2">
                <Label>Available Colors</Label>
                <Controller
                  control={control}
                  name="productColors"
                  render={({ field }) => (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {colors.map((color) => {
                        const isChecked = field.value?.includes(color.name);

                        return (
                          <div
                            key={color.name}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`color-${color.name}`}
                              checked={isChecked}
                              onCheckedChange={() => {
                                const newValue = isChecked
                                  ? field.value.filter(
                                      (c: string) => c !== color.name
                                    )
                                  : [...(field.value || []), color.name];
                                field.onChange(newValue);
                              }}
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
                        );
                      })}
                    </div>
                  )}
                />
                {errors.productColors && (
                  <p className="text-red-500 text-sm">
                    {errors.productColors.message}
                  </p>
                )}
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
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="100"
                    {...register("productStockQuantity")}
                  />
                  {errors.productStockQuantity && (
                    <p className="text-destructive">
                      {errors.productStockQuantity.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.01"
                    placeholder="0.25"
                    {...register("productWeight")}
                  />
                  {errors.productWeight && (
                    <p className="text-sm text-red-500">
                      {errors.productWeight.message}
                    </p>
                  )}
                </div>
              </div>

              <Controller
                control={control}
                name="productTags"
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="px-2 py-1"
                        >
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
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddTag();
                          }
                        }}
                        placeholder="Add a tag..."
                      />
                      <Button type="button" onClick={handleAddTag}>
                        Add
                      </Button>
                    </div>
                    {errors.productTags && (
                      <p className="text-sm text-red-500">
                        {errors.productTags.message?.toString()}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="productStatus"
                control={control}
                defaultValue="Draft"
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue="Draft"
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {status.map((s) => (
                          <SelectItem value={s} key={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.productStatus && (
                      <p className="text-red-500 text-sm">
                        {errors.productStatus.message}
                      </p>
                    )}
                  </div>
                )}
              />
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
