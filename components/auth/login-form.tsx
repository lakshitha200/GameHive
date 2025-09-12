"use client";

import { useAuth } from "@/lib/providers/auth-provider";
import { Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function LoginForm() {
  
  const { loading,login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const looged = await login(email, password);
    if(looged){
      router.push("/account/library");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="relative">
        <Mail className="absolute top-3 left-3 w-5 h-5 text-gray-400 dark:text-gray-500" />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 pl-10 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          required
        />
      </div>

      <div className="relative">
        <Lock className="absolute top-3 left-3 w-5 h-5 text-gray-400 dark:text-gray-500" />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 pl-10 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition shadow-md hover:shadow-lg disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
