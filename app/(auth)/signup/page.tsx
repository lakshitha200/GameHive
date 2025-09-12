"use client";

import SignupForm from "@/components/auth/signup-form";
import { User, Mail, Lock } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
          Sign Up
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300 text-center">
          Create your account and start exploring games.
        </p>

        <SignupForm />
      </div>
    </main>
  );
}
