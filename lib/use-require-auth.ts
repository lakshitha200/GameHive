"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/lib/providers/auth-provider";

/** Wraps an action so anonymous visitors are sent to login first, then returned. */
export function useRequireAuth() {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  return useCallback(
    (action: () => void) => {
      if (user) return action();
      toast("Please log in to continue", { icon: "🔒" });
      router.push(`/login?next=${encodeURIComponent(pathname)}`);
    },
    [user, router, pathname],
  );
}
