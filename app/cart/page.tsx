"use client";

import { useCart } from "@/lib/providers/cart-provider";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const { cart,subtotal,updateQuantity,removeItem } = useCart();

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="font-heading text-4xl font-bold text-gray-900 dark:text-white mb-8">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">Your cart is empty.</p>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center bg-white dark:bg-gray-800 rounded-xl shadow p-4">
                <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-lg" />
                <div className="ml-4 flex-1">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300">${item.price.toFixed(2)}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-4 p-2 text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 />
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Summary</h2>
            <div className="flex justify-between text-gray-700 dark:text-gray-300 mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700 dark:text-gray-300 mb-4">
              <span>Discount</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 dark:text-white mb-6">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition shadow-md hover:shadow-lg">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
