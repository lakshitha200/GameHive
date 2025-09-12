"use client";

import { useEffect, useState } from "react";
import { cartItems as initialCart } from "@/lib/data/cart";

export default function useCart() {
  const [cart, setCart] = useState(initialCart);

  const addItem = (item: any) => {
    const exists = cart.find((i) => i.id === item.id);
    console.log(exists)
    if (exists) {
      setCart(cart.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)));
    } else {
      console.log(item)
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  useEffect(() => {
        console.log(cart)
    setCart(cart);
  }, [cart]);



  const removeItem = (id: number) => setCart(cart.filter((i) => i.id !== id));

  const updateQuantity = (id: number, qty: number) =>
    setCart(cart.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return { cart, addItem, removeItem, updateQuantity, subtotal };
}
