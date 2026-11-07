"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, ReactNode } from "react";
import toast from "react-hot-toast";
import { Coupon, checkCoupon, couponDiscount } from "@/lib/data/coupons";
import { Game } from "@/lib/data/games";
import { finalPrice } from "@/lib/format";

export type CartItem = {
  id: number;
  title: string;
  price: number; // unit price actually charged (discount applied)
  originalPrice: number;
  quantity: number;
  image: string;
};

type CartContextType = {
  cart: CartItem[];
  count: number;
  hydrated: boolean;
  addItem: (game: Game) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  clear: () => void;
  has: (id: number) => boolean;
  subtotal: number;
  coupon: Coupon | null;
  discount: number;
  total: number;
  applyCoupon: (code: string) => string | null; // returns error message
  removeCoupon: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);
const KEY = "gh-cart";
const MAX_QTY = 5;

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const cartRef = useRef(cart);
  cartRef.current = cart;

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "[]");
      if (Array.isArray(saved)) setCart(saved);
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(cart));
    } catch {}
  }, [cart, hydrated]);

  const addItem = useCallback((game: Game) => {
    const existing = cartRef.current.find((i) => i.id === game.id);
    if (existing && existing.quantity >= MAX_QTY) {
      toast.error(`Limit of ${MAX_QTY} per game`);
      return;
    }
    setCart((prev) =>
      prev.some((i) => i.id === game.id)
        ? prev.map((i) => (i.id === game.id ? { ...i, quantity: i.quantity + 1 } : i))
        : [
            ...prev,
            {
              id: game.id,
              title: game.title,
              image: game.image,
              price: finalPrice(game.price, game.discount),
              originalPrice: game.price,
              quantity: 1,
            },
          ],
    );
    toast.success(existing ? `${game.title} quantity increased` : `${game.title} added to cart`);
  }, []);

  const removeItem = useCallback((id: number) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
    toast.success("Item removed");
  }, []);

  const updateQuantity = useCallback((id: number, qty: number) => {
    const q = Math.min(MAX_QTY, Math.max(1, qty));
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: q } : i)));
  }, []);

  const clear = useCallback(() => {
    setCart([]);
    setCoupon(null);
  }, []);

  const has = useCallback((id: number) => cart.some((i) => i.id === id), [cart]);

  const subtotal = useMemo(() => cart.reduce((a, i) => a + i.price * i.quantity, 0), [cart]);
  const count = useMemo(() => cart.reduce((a, i) => a + i.quantity, 0), [cart]);

  // Drop a coupon whose minimum spend is no longer met.
  useEffect(() => {
    if (coupon && !checkCoupon(coupon.code, subtotal).ok) {
      setCoupon(null);
      toast.error(`${coupon.code} removed: minimum spend not met`);
    }
  }, [subtotal, coupon]);

  const discount = couponDiscount(coupon, subtotal);
  const total = Math.max(0, Math.round((subtotal - discount) * 100) / 100);

  const applyCoupon = useCallback(
    (code: string) => {
      const r = checkCoupon(code, subtotal);
      if (!r.ok) return r.error;
      setCoupon(r.coupon);
      toast.success(`${r.coupon.code} applied`);
      return null;
    },
    [subtotal],
  );

  const value = useMemo(
    () => ({
      cart, count, hydrated, addItem, removeItem, updateQuantity, clear, has,
      subtotal, coupon, discount, total, applyCoupon, removeCoupon: () => setCoupon(null),
    }),
    [cart, count, hydrated, addItem, removeItem, updateQuantity, clear, has, subtotal, coupon, discount, total, applyCoupon],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
