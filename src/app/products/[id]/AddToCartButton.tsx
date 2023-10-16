"use client";

import { useState, useTransition } from "react";

type AddToCartButtonProps = {
  productId: string;
  increaseCartItem: (productId: string) => Promise<void>;
};

export default function AddToCartButton({
  productId,
  increaseCartItem,
}: AddToCartButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <button
        className="btn btn-primary"
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            await increaseCartItem(productId);
            setSuccess(true);
          });
        }}
      >
        Add To cart
      </button>
      {isPending && <span className="loading loading-spinner loading-md" />}
      {!isPending && success && (
        <span className="text-success">Added to Cart</span>
      )}
    </div>
  );
}
