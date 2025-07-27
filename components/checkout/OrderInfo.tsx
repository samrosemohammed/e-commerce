"use client";
import { Loader2, ShoppingBag, Truck, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useSession } from "next-auth/react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Controller, useForm } from "react-hook-form";
import { OrderFormData, orderFormSchema, orderSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useState } from "react";
import { trpc } from "@/server/client";
import { toast } from "sonner";

export const OrderInfo = () => {
  const { data: session } = useSession();
  const { cart, cartCount, cartTotal } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initiateEsewaPayment =
    trpc.paymentRouter.initiateEsewaPayment.useMutation();
  const { mutate: createOrder } = trpc.userRouter.createOrder.useMutation({
    onSuccess: (data) => {
      console.log(data);
      toast.success("Order Created");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      email: session?.user.email ?? "",
      paymentMethod: "cash",
    },
  });
  const shipping = cartTotal > 50 ? 0 : 5.99;
  const tax = cartTotal * 0.08;
  const finalTotal = cartTotal + shipping + tax;

  const onSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true);

    try {
      const transactionId = `TXN-${Date.now()}`;
      const enrichedData = {
        ...data,
        products: cart.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
          price: item.product.price,
          total: item.product.price * item.quantity,
        })),
        summary: {
          items: cartCount,
          cartTotal,
          shipping,
          tax,
          finalTotal,
        },
      };

      if (data.paymentMethod === "cash") {
        createOrder(enrichedData);
        console.log("Cash Order:", enrichedData);
        return;
      }

      if (data.paymentMethod === "esewa") {
        createOrder(enrichedData);
        const result = await initiateEsewaPayment.mutateAsync({
          amount: finalTotal.toFixed(2),
          transactionId,
          productCode: "EPAYTEST",
        });

        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

        const payload = result.esewaConfig;

        Object.entries(payload).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = String(value);
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      }
    } catch (error) {
      console.error("Order Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="">
      <form className="py-4" action="" onSubmit={handleSubmit(onSubmit)}>
        {/* Shipping Information */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>
                  <h2 className="flex items-center gap-2 font-semibold">
                    <Truck />
                    Shipping Information
                  </h2>
                </CardTitle>

                <CardContent className="space-y-4 p-2">
                  <div className="flex items-center gap-2 justify-between">
                    <div className="space-y-2 w-full">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input
                        {...register("firstName")}
                        id="firstName"
                        name="firstName"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2 w-full">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        {...register("lastName")}
                        id="lastName"
                        name="lastName"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      {...register("email")}
                      id="email"
                      name="email"
                      placeholder="your@gmail.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone No.</Label>
                    <Input
                      {...register("phone")}
                      id="phone"
                      name="phone"
                      placeholder="eg. 9828047184"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      {...register("address")}
                      id="address"
                      name="address"
                      placeholder="eg. Bafal"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="space-y-2 w-full">
                      <Label htmlFor="city">City</Label>
                      <Input {...register("city")} id="city" name="city" />
                    </div>
                    <div className="space-y-2 w-full">
                      <Label htmlFor="provience">Province</Label>
                      <Input
                        {...register("province")}
                        id="provience"
                        name="provience"
                      />
                    </div>
                  </div>
                  {errors.city && (
                    <p className="text-red-500 text-sm">
                      {errors.city.message}
                    </p>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="zip">Zip Code</Label>
                    <Input {...register("zip")} id="zip" name="zip" />
                    {errors.zip && (
                      <p className="text-red-500 text-sm">
                        {errors.zip.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </CardHeader>
            </Card>

            {/* Payment Method */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>
                  <h2 className="flex items-center gap-2 font-semibold">
                    <Wallet />
                    Payment Method
                  </h2>
                </CardTitle>
                <CardContent className="p-2">
                  <Controller
                    name="paymentMethod"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        name={field.name}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="cash" id="cash" />
                          <Label htmlFor="cash">Cash</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="esewa" id="esewa" />
                          <Label htmlFor="esewa">eSewa</Label>
                        </div>
                      </RadioGroup>
                    )}
                  />
                  {errors.paymentMethod && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.paymentMethod.message}
                    </p>
                  )}
                </CardContent>
              </CardHeader>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="self-start">
            <Card className="">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Products List */}
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                      className="flex items-start justify-between"
                    >
                      {/* Left: Image and product details */}
                      <div className="flex gap-3">
                        <div className="relative w-14 h-14 flex-shrink-0">
                          <Image
                            src={item.product.images[0] || "/placeholder.svg"}
                            alt={item.product.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>

                        <div className="text-sm">
                          <p className="font-medium">{item.product.name}</p>
                          <div className="text-xs text-muted-foreground">
                            {item.selectedColor && (
                              <p>Color: {item.selectedColor}</p>
                            )}
                            {item.selectedSize && (
                              <p>Size: {item.selectedSize}</p>
                            )}
                            <p>Qty: {item.quantity}</p>
                          </div>
                        </div>
                      </div>

                      {/* Right: Price */}
                      <div className="text-sm font-medium whitespace-nowrap">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pricing Summary */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Items ({cartCount})</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                {/* Total */}
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>

                {/* Free shipping hint */}
                {cartTotal < 50 && (
                  <p className="text-sm text-muted-foreground">
                    Add ${(50 - cartTotal).toFixed(2)} more for free shipping!
                  </p>
                )}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin size-4" />
                  ) : null}{" "}
                  Place Order
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};
