"use client";

import LoginForm from "@/components/auth/login-form";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
          Login
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300 text-center">
          Welcome back! Please login to your account.
        </p>

        <LoginForm/>
      </div>
    </main>
  );
}
