"use client";

import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/providers/auth-provider";
import { Skeleton } from "../ui/Skeletons";

/** Redirects anonymous visitors to /login and returns them afterwards. */
export default function AccountGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) router.replace(`/login?next=${encodeURIComponent(pathname)}`);
  }, [loading, user, router, pathname]);

  if (loading || !user) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy>
        {[0, 1, 2].map((i) => <Skeleton key={i} className="h-56 !rounded-2xl" />)}
      </div>
    );
  }
  return <>{children}</>;
}
