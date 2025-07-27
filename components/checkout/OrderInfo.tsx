"use client";
import { Truck, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useSession } from "next-auth/react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export const OrderInfo = () => {
  const { data: session } = useSession();

  return (
    <div className="">
      <form className="py-4" action="">
        {/* Shipping Information */}
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
                  <Label htmlFor="order-first-name">First Name</Label>
                  <Input id="order-first-name" name="order-first-name" />
                </div>
                <div className="space-y-2 w-full">
                  <Label htmlFor="order-last-name">Last Name</Label>
                  <Input id="order-last-name" name="order-last-name" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="order-email">Email</Label>
                <Input
                  id="order-email"
                  name="order-email"
                  value={session?.user.email ?? ""}
                  placeholder="your@gmail.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order-phone-no">Phone No.</Label>
                <Input
                  id="order-phone-no"
                  name="order-phone-no"
                  placeholder="eg. 9828047184"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order-address">Address</Label>
                <Input
                  id="order-address"
                  name="order-address"
                  placeholder="eg. Bafal"
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="space-y-2 w-full">
                  <Label htmlFor="order-city">City</Label>
                  <Input id="order-city" name="order-city" />
                </div>
                <div className="space-y-2 w-full">
                  <Label htmlFor="order-provience">Province</Label>
                  <Input id="order-provience" name="order-provience" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="order-zip-code">Zip Code</Label>
                <Input id="order-zip-code" name="order-zip-code" />
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
              <RadioGroup defaultValue="cash" name="payment-method">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash">Cash</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="esewa" id="esewa" />
                  <Label htmlFor="esewa">eSewa</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </CardHeader>
        </Card>
      </form>
    </div>
  );
};
