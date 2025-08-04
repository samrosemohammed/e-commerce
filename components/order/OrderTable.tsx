"use client";

import { trpc } from "@/server/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Loading } from "../Loading";
import { EmptyState } from "../Empty";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export const OrderTable = () => {
  const { data: orderData, isLoading } = trpc.userRouter.getOrder.useQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (!orderData || orderData.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="font-semibold text-2xl">My Orders</h1>
        <EmptyState
          title="No orders found"
          description="You haven't placed any orders yet. Start shopping to see your orders here."
          icon={<ShoppingCart className="w-12 h-12 text-gray-400" />}
          action={
            <Button asChild>
              <Link href={"/"}>
                <ShoppingBag />
                Continue shopping
              </Link>
            </Button>
          }
        />
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <h1 className="font-semibold text-2xl">My Orders</h1>
      {orderData.map((order) => (
        <Card key={order.id}>
          <CardHeader>
            <CardTitle>
              Order #{order.id.slice(0, 8)}... —{" "}
              <Badge variant="outline" className="capitalize">
                {order.status}
              </Badge>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Placed on {format(new Date(order.createdAt), "yyyy-MM-dd HH:mm")}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Customer</strong>
                <p>
                  {order.firstName} {order.lastName}
                </p>
                <p>{order.email}</p>
                <p>{order.phone}</p>
              </div>
              <div>
                <strong>Shipping Address</strong>
                <p>{order.address}</p>
                <p>
                  {order.city}, {order.province ?? "-"} {order.zip}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Color</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <img
                          src={item.product?.images[0] ?? "/placeholder.png"}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.selectedSize}</TableCell>
                      <TableCell>{item.selectedColor}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>${item.total.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="text-right space-y-1 text-sm">
              <p>Subtotal: ${order.cartTotal.toFixed(2)}</p>
              <p>Shipping: ${order.shipping.toFixed(2)}</p>
              <p>Tax: ${order.tax.toFixed(2)}</p>
              <p className="font-bold">Total: ${order.finalTotal.toFixed(2)}</p>
              <p className="capitalize">Payment: {order.paymentMethod}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
