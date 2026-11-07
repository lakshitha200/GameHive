"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import toast from "react-hot-toast";

export interface User {
  id: number;
  name: string;
  email: string;
  bio?: string;
}

type ApiResult = { ok: boolean; errors?: Record<string, string>; message?: string };

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<ApiResult>;
  signup: (name: string, email: string, password: string) => Promise<ApiResult>;
  logout: () => Promise<void>;
  updateProfile: (data: { name: string; bio: string }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const PROFILE_KEY = "gh-profile";

const readProfile = (): Partial<User> => {
  try {
    return JSON.parse(localStorage.getItem(PROFILE_KEY) ?? "{}");
  } catch {
    return {};
  }
};

async function post(url: string, body: unknown): Promise<ApiResult & { user?: User }> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, message: data.message, errors: data.errors, user: data.user };
  } catch {
    return { ok: false, message: "Network error. Please try again." };
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const applyProfile = useCallback((u: User | null) => {
    if (!u) return null;
    const p = readProfile();
    return p.email === u.email ? { ...u, name: p.name ?? u.name, bio: p.bio ?? u.bio } : u;
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => !cancelled && setUser(applyProfile(d.user ?? null)))
      .catch(() => !cancelled && setUser(null))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [applyProfile]);

  const login = useCallback(async (email: string, password: string) => {
    const r = await post("/api/auth/login", { email, password });
    if (r.ok && r.user) {
      setUser(applyProfile(r.user));
      toast.success(`Welcome back, ${r.user.name.split(" ")[0]}!`);
    }
    return r;
  }, [applyProfile]);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    const r = await post("/api/auth/signup", { name, email, password });
    if (r.ok) toast.success("Account created! Please log in.");
    return r;
  }, []);

  const logout = useCallback(async () => {
    await post("/api/auth/logout", {});
    setUser(null);
    toast.success("Logged out successfully");
  }, []);

  const updateProfile = useCallback((data: { name: string; bio: string }) => {
    setUser((u) => {
      if (!u) return u;
      const next = { ...u, ...data };
      try {
        localStorage.setItem(PROFILE_KEY, JSON.stringify({ email: u.email, ...data }));
      } catch {}
      return next;
    });
    toast.success("Profile updated");
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, signup, logout, updateProfile }),
    [user, loading, login, signup, logout, updateProfile],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
