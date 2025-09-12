// context/CartContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { cartItems as initialCart } from "@/lib/data/cart";
import toast from "react-hot-toast";

type CartItem = { id: number; title: string; price: number; quantity: number, image: string };

type CartContextType = {
    cart: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: number) => void;
    updateQuantity: (id: number, qty: number) => void;
    subtotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>(initialCart);

    const addItem = (item: CartItem) => {
        setCart((prev) => {
            const exists = prev.find((i) => i.id === item.id);
            if (exists) {

                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            } else {

                return [...prev, { ...item, quantity: 1 }];
            }
        });
        toast.success("Item added successfully!");
    };

    const removeItem = (id: number) => {
        setCart((prev) => prev.filter((i) => i.id !== id));
        toast.success("Item removed successfully!");
    }


    const updateQuantity = (id: number, qty: number) =>
        setCart((prev) =>
            prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
        );

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, updateQuantity, subtotal }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook to use cart
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
};
