import Link from "next/link";
import Image from "next/image";
import logo from "@/app/assets/logo.png";
import { redirect } from "next/navigation";
import { getCart } from "@/lib/db/cart";
import DisplayShoppingCart from "./DisplayShoppingCart";

async function searchProduct(formData: FormData) {
  "use server";

  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect(`/search?query=${searchQuery}`);
  }
}

export default async function NavBar() {
  const cart = await getCart();

  return (
    <nav className="bg-base-100">
      <div className="navbar m-auto max-w-7xl flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl normal-case">
            <Image src={logo} alt="Florian logo" height={40} width={40} />
            <span>Florian</span>
          </Link>
        </div>

        <div className="flex-none gap-2">
          <form action={searchProduct}>
            <div className="form-control">
              <input
                name="searchQuery"
                placeholder="search"
                className="input input-bordered w-full min-w-[100px]"
              />
            </div>
          </form>
          <DisplayShoppingCart cart={cart} />
        </div>
      </div>
    </nav>
  );
}
