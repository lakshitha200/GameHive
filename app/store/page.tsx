import type { Metadata } from "next";
import { games } from "@/lib/data/games";
import StoreBrowser from "@/components/store/store-browser";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Store", description: "Shop the latest games, exclusive deals and special offers." };

export default function StorePage() {
  return (
    <div className="container py-12">
      <PageHeader title="Game Store" subtitle="Discover the latest games, exclusive deals, and special offers. Find your next adventure today!" />
      <StoreBrowser games={games} />
    </div>
  );
}
