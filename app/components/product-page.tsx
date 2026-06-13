"use client";

import Image from "next/image";
import { ProductNode } from "../lib/interfaces/products.interface";
import ProductCard from "./product-card";

interface ProductPageProps {
  products: ProductNode;
  heroImage1: string;
  heroImage2: string;
  heroImage3: string;
}

const ProductPage = ({ products, heroImage1, heroImage2, heroImage3 }: ProductPageProps) => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="w-full">
        {/* Desktop — two images side by side */}
        <div className="hidden md:grid md:grid-cols-2 h-[90vh]">
          <div className="relative">
            <Image
              src={heroImage1}
              alt="Hero image 1"
              fill
              className="object-cover"
              sizes="50vw"
              priority
            />
          </div>
          <div className="relative">
            <Image
              src={heroImage2}
              alt="Hero image 2"
              fill
              className="object-cover"
              sizes="50vw"
              priority
            />
          </div>
        </div>

        {/* Mobile — single portrait image */}
        <div className="relative w-full aspect-3/4 md:hidden">
          <Image
            src={heroImage3}
            alt="Hero image"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </section>

      {/* Product grid */}
      <div className="grid grid-cols-2 w-full">
        {products.edges.map((product) => (
          <ProductCard
            key={product.node.id}
            product={product}
            cursor={product.cursor}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
