"use client";
import { ProductInfo, Variant } from "@/app/lib/interfaces/product.interface";
import { Minus, Plus } from "lucide-react";
import { FaAngleDown } from "react-icons/fa";
import { useState } from "react";
import { cartProps } from "@/app/store/cart.interface";
import { useCartStore } from "@/app/store/cart.store";
import { useCartUIStore } from "@/app/store/cart-ui-store";

export interface InfoPanelProps {
  product: ProductInfo;
  price: string;
  variants: Variant;
  sections: { id: string; label: string; content: string | string[] }[];
  selectedVariantId: string | null;
  openSection: string | null;
  onSelectVariant: (id: string) => void;
  onToggleSection: (id: string) => void;
}

const ProductData = ({
  product,
  price,
  variants,
  sections,
  selectedVariantId,
  openSection,
  onSelectVariant,
  onToggleSection,
}: InfoPanelProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, updateItemQuantity } = useCartStore();
  const setIsCartOpen = useCartUIStore((state) => state.openCart);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
    if (selectedVariantId) updateItemQuantity(selectedVariantId, quantity);
  };
  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
    if (selectedVariantId) updateItemQuantity(selectedVariantId, quantity);
  };

  const cartItem: cartProps = {
    id: product?.id || "",
    productName: product?.title || "",
    currencyCode: "$",
    quantity,
    price: parseInt(price),
    variant: "ONE SIZE",
    variantId: selectedVariantId || "",
    vendor: product?.vendor || "",
    productId: product?.id || "",
    imageUrl: product?.media.edges[0]?.node.image.url || "",
  };

  const addItemToCart = () => {
    setIsCartOpen();
    addToCart(cartItem);
  };

  const outOfStock = product.totalInventory === 0;

  return (
    <>
      {/* ── Desktop layout (unchanged) ── */}
      <div className="hidden md:block w-full font-primary text-center">
        <h1 className="text-2xl text-black tracking-wide leading-snug mb-4">
          {product?.title}
        </h1>

        <p className="text-xl font-black text-black mb-3 tracking-wide">
          ${price}
        </p>

        <div className="flex flex-col mt-8 items-center space-y-4">
          <div className="flex justify-between space-x-4 w-fit">
            <button className="cursor-pointer" onClick={decreaseQuantity}>
              <Minus className="text-black w-6 h-6" />
            </button>
            <span className="font-primary font-extrabold text-base text-black">
              {quantity}
            </span>
            <button className="cursor-pointer" onClick={increaseQuantity}>
              <Plus className="text-black w-6 h-6" />
            </button>
          </div>
        </div>

        {variants.edges.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-6 mt-3">
            {variants.edges.map(({ node }) => (
              <button
                key={node.id}
                onClick={() => onSelectVariant(node.id)}
                className={[
                  "px-10 py-3 border font-primary text-xs rounded-md uppercase transition-all duration-150",
                  selectedVariantId === node.id
                    ? "bg-[#1a1108] text-white border-[#1a1108]"
                    : "bg-white border-[#1a1108] text-black",
                ].join(" ")}
              >
                {node.title}
              </button>
            ))}
          </div>
        )}

        <button
          className="w-full py-3 bg-black rounded-md text-white text-sm font-primary font-semibold uppercase mb-8 hover:bg-secondary transition-colors duration-200 disabled:opacity-50"
          disabled={outOfStock}
          onClick={addItemToCart}
        >
          {outOfStock ? "OUT OF STOCK" : "ADD TO CART"}
        </button>

        <div className="border-t-2 border-secondary">
          {sections.map((section) => (
            <div key={section.id} className="border-b-2 border-secondary">
              <button
                onClick={() => onToggleSection(section.id)}
                className="w-full flex justify-between items-center py-3 text-sm text-black font-secondary font-medium uppercase"
              >
                <span>{section.label}</span>
                <FaAngleDown
                  className={`w-4 h-4 text-secondary transition-transform duration-200 ${
                    openSection === section.id ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openSection === section.id && (
                <div className="pb-5 text-base text-black font-secondary leading-relaxed tracking-wide text-left">
                  {Array.isArray(section.content) ? (
                    <ul className="list-disc list-inside space-y-1">
                      {section.content.map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{section.content}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile scroll content ── */}
      <div className="md:hidden w-full font-secondary ">
        <div className="flex flex-col mt-4 items-center space-y-4 mb-4">
          <div className="flex justify-between space-x-4 w-fit">
            <button className="cursor-pointer" onClick={decreaseQuantity}>
              <Minus className="text-black w-4 h-4" />
            </button>
            <span className="font-primary font-extrabold text-sm text-black">
              {quantity}
            </span>
            <button className="cursor-pointer" onClick={increaseQuantity}>
              <Plus className="text-black w-4 h-4" />
            </button>
          </div>
        </div>

        {variants.edges.length > 0 && (
          <div className="flex flex-wrap justify-center font-secondary gap-2 mb-4">
            {variants.edges.map(({ node }) => (
              <button
                key={node.id}
                onClick={() => onSelectVariant(node.id)}
                className={[
                  "px-5 py-3 border font-primary text-xs rounded-md uppercase transition-all duration-150",
                  selectedVariantId === node.id
                    ? "bg-[#1a1108] text-white border-[#1a1108]"
                    : "bg-white border-[#1a1108] text-black",
                ].join(" ")}
              >
                {node.title}
              </button>
            ))}
          </div>
        )}

        <div className="border-t-2 border-secondary">
          {sections.map((section) => (
            <div key={section.id} className="border-b-2 border-secondary">
              <button
                onClick={() => onToggleSection(section.id)}
                className="w-full flex justify-between items-center py-3 text-sm text-black font-secondary font-medium uppercase"
              >
                <span>{section.label}</span>
                <FaAngleDown
                  className={`w-4 h-4 text-secondary transition-transform duration-200 ${
                    openSection === section.id ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openSection === section.id && (
                <div className="pb-5 md:text-base text-sm text-black font-secondary leading-relaxed tracking-wide text-left">
                  {Array.isArray(section.content) ? (
                    <ul className="list-disc list-inside space-y-1">
                      {section.content.map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{section.content}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile sticky bottom bar ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-9999 bg-white text-black border-t border-gray-200 shadow-[0_-4px_24px_rgba(0,0,0,0.15)] px-4 pt-3 pb-6">
        <div className="flex items-center justify-between mb-3">
          <h1 className="font-primary font-black text-sm leading-tight max-w-[60%]">
            {product?.title}
          </h1>
          <p className="font-primary font-black text-sm">${price}</p>
        </div>
        <button
          className="w-full py-3.5 bg-black font-secondary text-white font-black uppercase text-xs tracking-widest rounded-md disabled:opacity-50 active:bg-gray-900 transition-colors"
          disabled={outOfStock}
          onClick={addItemToCart}
        >
          {outOfStock ? "OUT OF STOCK" : "ADD TO CART"}
        </button>
      </div>
    </>
  );
};

export default ProductData;
