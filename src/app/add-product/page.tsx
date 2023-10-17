import prisma from "@/lib/db/prisma";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

import FormButton from "@/components/FormButton";

export const metadata: Metadata = {
  title: "Add new product",
};

async function addProduct(formData: FormData) {
  "use server";

  const session = await getServerSession(authOptions);

  if (!session) redirect("/api/auth/sigin?callbackUrl=/add-product");

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price)
    throw new Error("Missing required fields");

  // for (let i = 0; i < 5; i++) {
  //   await prisma.product.create({
  //     data: { name, description, imageUrl, price },
  //   });
  // }

  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });

  redirect("/");
}

export default async function addProductPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/api/auth/sigin?callbackUrl=/add-product");

  return (
    <section className="">
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>

      <form action={addProduct}>
        <input
          required
          name="name"
          placeholder="Name"
          className="input input-bordered mb-3 w-full"
        />

        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered mb-3 w-full"
        />

        <input
          required
          name="imageUrl"
          placeholder="image URL"
          type="url"
          className="input input-bordered mb-3 w-full"
        />

        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input input-bordered mb-3 w-full"
        />

        <FormButton className="btn-block">Add product</FormButton>
      </form>
    </section>
  );
}
