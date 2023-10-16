import { getCart } from "@/lib/db/cart";
import { Metadata } from "next";
import CartSummary from "./CartSummary";
import { setProductQuantity } from "./actions";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "Your Shopping Cart",
};

export default async function CartPage() {
  const cart = await getCart();

  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
      {cart?.items.map((cartItem) => (
        <CartSummary
          key={cartItem.id}
          cartItem={cartItem}
          setProductQuantity={setProductQuantity}
        />
      ))}
      {!cart?.items.length && <p>Your cart is empty</p>}
      <div className="flex flex-col items-end sm:items-center">
        <p className="mb-3 font-bold">
          Total: {formatPrice(cart?.subtotal || 0)}
        </p>
        <button className="btn btn-primary sm:w-[200px]">Checkout</button>
      </div>
    </section>
  );
}
