import prisma from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import PriceTag from "@/components/PriceTag";
import { cache } from "react";
import AddToCartButton from "./AddToCartButton";
import { increaseCartItem } from "./actions";

type ProductPageProps = {
  params: {
    id: string;
  };
};

// To share data from database between 2 function so as no to fetch twice you catch. if you were using fetch, it will itself
const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  return product;
});

export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);

  return {
    title: product.name + " - Florian",
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl }],
    },
  };
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id);

  return (
    <section className="flex flex-col gap-4 lg:flex-row lg:items-center">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={500}
        className="rounded-lg"
        priority
      />

      <div>
        <h1>{product.name}</h1>
        <PriceTag price={product.price} className="mt-4" />
        <p className="py-6">{product.description}</p>
        <AddToCartButton
          productId={product.id}
          increaseCartItem={increaseCartItem}
        />
      </div>
    </section>
  );
}
