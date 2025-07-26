import CartContent from "@/components/cart/CartContent";

export default function CartPage() {
  return (
    <div className="py-4 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <CartContent />
    </div>
  );
}
