'use client'
import Image from "next/image";
import Link from "next/link";
import { useCartUIStore } from "../store/cart-ui-store";
import { useCartStore } from "../store/cart.store";
import { ShoppingBag } from "lucide-react";

const Navbar = () => {
  const openCart = useCartUIStore((state) => state.openCart);
  const itemCount = useCartStore((state) => state.cartItems.length);

  return (
    <nav className="bg-white z-50">
      <div className="max-w-8xl mx-auto px-4 md:px-8">
        <div className="relative flex items-center justify-center h-32 md:h-40">
          {/* Logo — stays centered */}
          <Link href="/" className="relative h-24 md:w-48 md:h-32">
            <Image
              src="https://cdn.shopify.com/s/files/1/0718/1035/1259/files/IMG_9289.jpg?v=1781354401"
              alt="Street Savant Logo"
              width={200}
              height={200}
              className="object-contain w-full h-full"
              priority
            />
          </Link>

          {/* Cart button — pinned to the right */}
          <button
            onClick={openCart}
            className="absolute right-0 flex items-center gap-2 text-white px-5 py-3 md:px-7 md:py-4 font-primary font-black uppercase tracking-widest text-sm md:text-base"
          >
            <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-black" strokeWidth={2.5} />
            {itemCount > 0 && (
              <span className="bg-white text-black text-xs font-black w-5 h-5 flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;