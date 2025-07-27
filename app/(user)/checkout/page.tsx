import CartSummary from "@/components/cart/CartSummary";
import { OrderInfo } from "@/components/checkout/OrderInfo";

export default function Checkout() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <OrderInfo />
    </div>
  );
}
