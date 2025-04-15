import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import db from "@/utils/db";
import CartModel from "@/models/Cart";
import UserModel from "@/models/Users";
import ShippingSection from "@/components/checkout/ShippingSection";
import CartHeader from "@/components/cart/CartHeader";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function CheckoutPage() {
  await db.connectDb();

  const session = await getServerSession(options);

  let user = null;
  let cart = null;

  if (session?.user?.id) {
    user = await UserModel.findById(session.user.id).lean();
    cart = await CartModel.findOne({ user: session.user.id }).lean();
  } else {
    const guestId = (await cookies()).get("guestId")?.value;
    if (!guestId) redirect("/cart");
    cart = await CartModel.findOne({ guestId }).lean();
    const cartDoc = await CartModel.findOne({ guestId });
    if (cartDoc) cart = JSON.parse(JSON.stringify(cartDoc));
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    redirect("/cart");
  }

  return (
    <>
      <CartHeader />

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ShippingSection user={user} cart={cart} />
        <div className="bg-white p-6 rounded shadow-md">
          {/* Placeholder for payment component (future step) */}
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <p className="text-gray-600">Items: {cart.items.length}</p>
          <p className="text-gray-600">Total: ${cart.cartTotal?.toFixed(2)}</p>
          {/* Future: payment method selection, stripe logic, etc. */}
        </div>
      </div>
    </>
  );
}
