"use client";

import { User, Mail, Lock } from "lucide-react";
import { useState } from "react";
import useAuth from "@/hooks/use-auth";

export default function SignupForm() {
  const { signup, loading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return alert("Passwords do not match");
    await signup(name, email, password);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="relative">
        <User className="absolute top-3 left-3 w-5 h-5 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 pl-10 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          required
        />
      </div>

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

      <div className="relative">
        <Lock className="absolute top-3 left-3 w-5 h-5 text-gray-400 dark:text-gray-500" />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 pl-10 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition shadow-md hover:shadow-lg disabled:opacity-50"
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
}
