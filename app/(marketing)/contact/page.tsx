"use client";

import { Mail, User, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="container mx-auto px-6 py-16">
      <section className="max-w-2xl mx-auto space-y-8">
        <h1 className="font-heading text-4xl font-bold text-gray-900 dark:text-white text-center">
          Contact Us
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-center">
          Have questions or feedback? Send us a message!
        </p>

        <form className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
          <div className="relative">
            <User className="absolute top-3 left-3 w-6 h-6 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 pl-10 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Your Name"
            />
          </div>

          <div className="relative">
            <Mail className="absolute top-3 left-3 w-6 h-6 text-gray-400 dark:text-gray-500" />
            <input
              type="email"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 pl-10 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="you@example.com"
            />
          </div>

          <div className="relative">
            <MessageSquare className="absolute top-3 left-3 w-6 h-6 text-gray-400 dark:text-gray-500" />
            <textarea
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 pl-10 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              rows={5}
              placeholder="Your message..."
            />
          </div>

          <button
            type="submit"
            className="button-primary"
          >
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
}
