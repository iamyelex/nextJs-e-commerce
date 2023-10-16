import prisma from "./prisma";
import { cookies } from "next/dist/client/components/headers";
import { Cart, Prisma } from "@prisma/client";

export type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;

export type shoppingCart = CartWithProducts & {
  size: number;
  subtotal: number;
};

export async function createCart(): Promise<shoppingCart> {
  const newCart = await prisma.cart.create({
    data: {},
  });

  //   saving the id of anonymous user so they can access cart and store data
  cookies().set("localCartId", newCart.id);

  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
}

export async function getCart(): Promise<shoppingCart | null> {
  const localCartId = cookies().get("localCartId")?.value;
  //   getting the id back
  const cart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },
        // making sure it includes items and product model because they are handled seperateyly in db
        include: { items: { include: { product: true } } },
      })
    : null;

  if (!cart) return null;

  return {
    ...cart,
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    ),
  };
}
