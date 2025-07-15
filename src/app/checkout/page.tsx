import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import db from "@/utils/db";
import CartModel from "@/models/Cart";
import UserModel from "@/models/Users";
import ShippingSection from "@/components/checkout/ShippingSection";
import CheckoutProducts from "@/components/checkout/CheckoutProducts";
import CheckoutPaymentSelector from "@/components/checkout/CheckoutPayment";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import CartHeader from "@/components/cart/CartHeader";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function CheckoutPage() {
  await db.connectDb();

  const session = await getServerSession(options);

  let user = null;
  let cart = null;

  if (process.env.MONGODB_URL) {
    try {
      if (session?.user?.id) {
        const userDoc = await UserModel.findById(session.user.id).lean();
        const cartDoc = await CartModel.findOne({ user: session.user.id }).lean();

        if (userDoc) user = JSON.parse(JSON.stringify(userDoc));
        if (cartDoc) cart = JSON.parse(JSON.stringify(cartDoc));
      } else {
        const guestId = (await cookies()).get("guestId")?.value;
        if (!guestId) redirect("/cart");
        cart = await CartModel.findOne({ guestId }).lean();
        const cartDoc = await CartModel.findOne({ guestId });
        if (cartDoc) cart = JSON.parse(JSON.stringify(cartDoc));
      }
    } catch (err) {
      console.error("Error fetching checkout data", err);
    }
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
          <CheckoutPaymentSelector cart={cart} />

          {/* Future: payment method selection, stripe logic, etc. */}
          <CheckoutSummary cart={cart} user={user} paymentMethod="stripe" />
        </div>
        <CheckoutProducts cart={cart} />
      </div>
      <div className="container mx-auto px-4 py-8"></div>
    </>
  );
}
