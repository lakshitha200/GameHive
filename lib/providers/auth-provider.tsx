"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import toast from "react-hot-toast";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean | undefined>;
  logout: () => Promise<boolean | undefined>;
  fetchUser: ()=>void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user on page load
  const fetchUser = () => {
    useEffect(() => {
      fetch("/api/auth/me")
        .then((res) => res.json())
        .then((data) => setUser(data.user || null))
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    }, []);
  }
  fetchUser();

  // Login
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      toast.success("Logged in successfully!");
      return true;
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };


  // Logout
  const logout = async () => {
    // await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    toast.success("Logged out successfully!");
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout,fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
