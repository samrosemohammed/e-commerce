import CartContent from "@/components/cart/CartContent";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CartPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  console.log(user);
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="py-4 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <CartContent />
    </div>
  );
}
