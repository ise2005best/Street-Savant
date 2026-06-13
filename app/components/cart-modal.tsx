"use client";

import Image from "next/image";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "../store/cart.store";
import { useCartUIStore } from "../store/cart-ui-store";
import { useState } from "react";

const CartModal = () => {
  const { cartItems, removeItem, updateItemQuantity } = useCartStore();
  const { isCartOpen, closeCart } = useCartUIStore();
  const [checkingOut, setCheckingOut] = useState(false);
  console.log("Cart items in CartModal:", cartItems);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const currency = cartItems[0]?.currencyCode ?? "$";

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setCheckingOut(true);
    try {
      const res = await fetch("/api/shopify/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            VariantId: item.variantId,
            quantity: item.quantity,
          })),
        }),
      });
      const { checkoutUrl } = await res.json();
     if (checkoutUrl) {
      window.location.href = checkoutUrl;
    } else {
      console.error("No checkout URL found in response");
    };
    } catch (err) {
      console.error(err);
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-9998 bg-black/40 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Drawer — bottom sheet on mobile, right panel on desktop */}
      <div
        className={`fixed z-9999 bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out
          bottom-0 left-0 right-0 h-1/2 rounded-t-2xl
          md:top-0 md:bottom-auto md:left-auto md:right-0 md:h-full md:w-full md:max-w-sm md:rounded-none
          ${isCartOpen
            ? "translate-y-0 md:translate-y-0 md:translate-x-0"
            : "translate-y-full md:translate-y-0 md:translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex text-black items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="font-primary font-black uppercase tracking-widest text-sm">
              Cart
            </span>
            {cartItems.length > 0 && (
              <span className="bg-black text-white text-xs font-black w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </div>
          <button onClick={closeCart} className="p-1 hover:opacity-60 transition-opacity">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 text-black overflow-y-auto px-5 py-4 space-y-5">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
              <ShoppingBag className="w-10 h-10 text-gray-300" />
              <p className="font-primary font-black uppercase tracking-widest text-sm text-gray-400">
                Your cart is empty
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.variantId} className="flex gap-3">
                {/* Image */}
                {item.imageUrl && (
                  <div className="relative w-20 h-24 shrink-0 bg-gray-50">
                    <Image
                      src={item.imageUrl}
                      alt={item.productName}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                )}

                {/* Info */}
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <p className="font-primary font-black text-xs uppercase tracking-wide leading-tight line-clamp-2">
                      {item.productName}
                    </p>
                    <button
                      onClick={() => removeItem(item.variantId)}
                      className="shrink-0 p-0.5 hover:opacity-50 transition-opacity"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {item.variant && item.variant !== "ONE SIZE" && (
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
                      {item.variant}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-auto">
                    {/* Quantity */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateItemQuantity(item.variantId, item.quantity - 1)
                        }
                        className="hover:opacity-50 transition-opacity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-primary font-black text-sm w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateItemQuantity(item.variantId, item.quantity + 1)
                        }
                        className="hover:opacity-50 transition-opacity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Price */}
                    <p className="font-primary font-black text-sm tabular-nums">
                      {currency}{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-100 text-black px-5 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-primary font-black uppercase tracking-widest text-xs text-gray-500">
                Subtotal
              </span>
              <span className="font-primary font-black text-base tabular-nums">
                {currency}{subtotal.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-gray-400 font-secondary tracking-wide">
              Shipping & taxes calculated at checkout
            </p>
            <button
              onClick={handleCheckout}
              disabled={checkingOut}
              className="w-full bg-black text-white font-primary font-black uppercase tracking-widest text-sm py-4 hover:bg-gray-900 transition-colors disabled:opacity-50"
            >
              {checkingOut ? "Redirecting…" : "Checkout"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartModal;
