"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import toast from "react-hot-toast";
import { getGame } from "@/lib/data/games";

type Ctx = {
  wishlist: number[];
  library: number[];
  inWishlist: (id: number) => boolean;
  toggleWishlist: (id: number) => void;
  addToLibrary: (ids: number[]) => void;
};

const CollectionContext = createContext<Ctx | undefined>(undefined);
const WL = "gh-wishlist";
const LIB = "gh-library";
const DEFAULT_LIBRARY = [1, 2, 3];
const DEFAULT_WISHLIST = [4, 5];

const load = (key: string, fallback: number[]) => {
  try {
    const v = JSON.parse(localStorage.getItem(key) ?? "null");
    return Array.isArray(v) ? (v as number[]) : fallback;
  } catch {
    return fallback;
  }
};

export function CollectionProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [library, setLibrary] = useState<number[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setWishlist(load(WL, DEFAULT_WISHLIST));
    setLibrary(load(LIB, DEFAULT_LIBRARY));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(WL, JSON.stringify(wishlist));
      localStorage.setItem(LIB, JSON.stringify(library));
    } catch {}
  }, [wishlist, library, ready]);

  const toggleWishlist = useCallback(
    (id: number) => {
      const title = getGame(id)?.title ?? "Game";
      if (wishlist.includes(id)) {
        setWishlist((w) => w.filter((x) => x !== id));
        toast.success(`${title} removed from wishlist`);
      } else {
        setWishlist((w) => [...w, id]);
        toast.success(`${title} added to wishlist`);
      }
    },
    [wishlist],
  );

  const addToLibrary = useCallback((ids: number[]) => {
    setLibrary((l) => Array.from(new Set([...l, ...ids])));
    setWishlist((w) => w.filter((x) => !ids.includes(x)));
  }, []);

  const value = useMemo(
    () => ({ wishlist, library, inWishlist: (id: number) => wishlist.includes(id), toggleWishlist, addToLibrary }),
    [wishlist, library, toggleWishlist, addToLibrary],
  );
  return <CollectionContext.Provider value={value}>{children}</CollectionContext.Provider>;
}

export const useCollection = () => {
  const c = useContext(CollectionContext);
  if (!c) throw new Error("useCollection must be used within CollectionProvider");
  return c;
};
