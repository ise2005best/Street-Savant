"use client";
import { Products } from "../lib/interfaces/products.interface";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  cursor: string;
  product: Products;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, title, media, totalInventory, handle, variants } = product.node;

  const mainImage = media.edges[0]?.node?.image?.url ?? "";
  const hoverImage = media.edges[1]?.node?.image?.url;
  const price = (variants.edges[0]?.node?.price as unknown as { amount: string } | undefined)?.amount;

  if (!mainImage) return null;

  return (
    <Link href={`/product/${handle}`} key={id} className="block w-full group">
      {/* Image — portrait aspect ratio, scales with grid column width */}
      <div className="relative w-full aspect-3/4 md:aspect-15/16 overflow-hidden">
        <Image
          src={mainImage}
          alt={title}
          fill
          className={`object-cover transition-opacity duration-300 ${
            hoverImage ? "group-hover:opacity-0" : ""
          }`}
          sizes="(max-width: 768px) 50vw, 33vw"
        />

        {hoverImage && totalInventory !== 0 && (
          <Image
            src={hoverImage}
            alt={`${title} hover`}
            fill
            className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        )}

        {totalInventory === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
            <span className="bg-red-500 text-white font-black text-xs px-3 py-1 tracking-widest">
              SOLD OUT
            </span>
          </div>
        )}
      </div>

      {/* Info row — always visible below image */}
      <div className="flex items-start justify-between px-6 gap-2 pt-2 pb-1">
        <h2 className="text-xs md:text-sm font-semibold font-primary text-black leading-tight line-clamp-2 flex-1">
          {title}
        </h2>
        {price && (
          <span className="text-xs md:text-sm text-black font-primary font-medium shrink-0 tabular-nums">
            ${parseFloat(price).toFixed(2)}
          </span>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;