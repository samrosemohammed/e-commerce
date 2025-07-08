"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  registrationSellerSchema,
  SellerRegistrationFormValues,
} from "@/lib/zodSchemas";

interface SellerRegistrationFormProps {
  onSuccess: () => void;
  onLoginClick: () => void;
}

export const SellerRegistrationForm = ({
  onSuccess,
  onLoginClick,
}: SellerRegistrationFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SellerRegistrationFormValues>({
    resolver: zodResolver(registrationSellerSchema),
    defaultValues: {
      storeName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      storeType: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      termsAccepted: false,
    },
  });

  const onSubmit = async (data: SellerRegistrationFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // For demo purposes, let's pretend registration was successful
      console.log("Registration successful", data);
      onSuccess();

      // In a real app, you would:
      // 1. Send registration data to your API
      // 2. Handle verification process
      // 3. Redirect to login or onboarding
    } catch (err) {
      setError("Failed to create account. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-semibold">Create a Seller Account</h2>
        <p className="text-sm text-muted-foreground">
          Start selling your clothing products today
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
          <h3 className="font-medium">Store Information</h3>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="storeName">Store Name</Label>
              <Input
                id="storeName"
                placeholder="Your Clothing Store"
                {...register("storeName")}
                disabled={isLoading}
              />
              {errors.storeName && (
                <p className="text-sm text-destructive">
                  {errors.storeName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="storeType">Store Type</Label>
              <Select
                disabled={isLoading}
                onValueChange={(value) => setValue("storeType", value)}
                defaultValue={watch("storeType")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select store type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="womens-clothing">
                    Women's Clothing
                  </SelectItem>
                  <SelectItem value="mens-clothing">Men's Clothing</SelectItem>
                  <SelectItem value="kids-clothing">Kids' Clothing</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                  <SelectItem value="footwear">Footwear</SelectItem>
                  <SelectItem value="vintage">Vintage & Second-hand</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.storeType && (
                <p className="text-sm text-destructive">
                  {errors.storeType.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Account Information</h3>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                {...register("email")}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                  disabled={isLoading}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+1 (555) 123-4567"
                {...register("phoneNumber")}
                disabled={isLoading}
              />
              {errors.phoneNumber && (
                <p className="text-sm text-destructive">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Address Information</h3>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="123 Fashion Street"
                {...register("address")}
                disabled={isLoading}
              />
              {errors.address && (
                <p className="text-sm text-destructive">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="New York"
                  {...register("city")}
                  disabled={isLoading}
                />
                {errors.city && (
                  <p className="text-sm text-destructive">
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Input
                  id="state"
                  placeholder="NY"
                  {...register("state")}
                  disabled={isLoading}
                />
                {errors.state && (
                  <p className="text-sm text-destructive">
                    {errors.state.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                <Input
                  id="zipCode"
                  placeholder="10001"
                  {...register("zipCode")}
                  disabled={isLoading}
                />
                {errors.zipCode && (
                  <p className="text-sm text-destructive">
                    {errors.zipCode.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  placeholder="United States"
                  {...register("country")}
                  disabled={isLoading}
                />
                {errors.country && (
                  <p className="text-sm text-destructive">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start space-x-2 pt-2">
          <Checkbox id="termsAccepted" {...register("termsAccepted")} />
          <div className="grid gap-1.5 leading-none">
            <Label
              htmlFor="termsAccepted"
              className="text-sm font-normal leading-snug"
            >
              I agree to the{" "}
              <a href="#" className="font-medium underline hover:text-primary">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="font-medium underline hover:text-primary">
                Privacy Policy
              </a>
            </Label>
            {errors.termsAccepted && (
              <p className="text-sm text-destructive">
                {errors.termsAccepted.message}
              </p>
            )}
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create Seller Account"
          )}
        </Button>
      </form>

      <div className="text-center text-sm">
        <p>
          Already have a seller account?{" "}
          <Button
            variant="link"
            className="p-0 h-auto font-normal"
            onClick={onLoginClick}
          >
            Login instead
          </Button>
        </p>
      </div>
    </div>
  );
};
