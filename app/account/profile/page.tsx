"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Library, LogOut, Mail, Pencil, ShoppingCart, User } from "lucide-react";
import { useAuth } from "@/lib/providers/auth-provider";
import { useCart } from "@/lib/providers/cart-provider";
import { useCollection } from "@/lib/providers/collection-provider";
import { Errors, validateProfile } from "@/lib/validation";
import FormField from "@/components/ui/FormField";

export default function ProfilePage() {
  const { user, logout, updateProfile } = useAuth();
  const { count } = useCart();
  const { library, wishlist } = useCollection();
  const router = useRouter();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name ?? "", bio: user?.bio ?? "" });
  const [errors, setErrors] = useState<Errors<"name" | "bio">>({});

  if (!user) return null;

  const signOut = async () => {
    await logout();
    router.push("/");
  };

  const save = (e: FormEvent) => {
    e.preventDefault();
    const errs = validateProfile(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    updateProfile({ name: form.name.trim(), bio: form.bio.trim() });
    setEditing(false);
  };

  const stats = [
    { icon: Library, label: "Games owned", value: library.length, href: "/account/library" },
    { icon: Heart, label: "Wishlist", value: wishlist.length, href: "/account/wishlist" },
    { icon: ShoppingCart, label: "In cart", value: count, href: "/cart" },
  ];

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="surface animate-fade-up flex flex-col items-center space-y-3 p-8 text-center md:col-span-1">
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 text-5xl font-bold shadow-xl shadow-indigo-900/40">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="flex items-center gap-2 text-gray-400"><Mail size={14} /> {user.email}</p>
        <button onClick={signOut} className="btn-danger btn-sm mt-4">
          <LogOut size={16} /> Log out
        </button>
      </div>

      <div className="space-y-6 md:col-span-2">
        <div className="grid grid-cols-3 gap-4">
          {stats.map(({ icon: Icon, label, value, href }, i) => (
            <Link key={label} href={href} className="surface animate-fade-up group p-4 text-center transition hover:-translate-y-1 hover:border-indigo-500/40" style={{ animationDelay: `${i * 80}ms` }}>
              <Icon className="mx-auto mb-2 h-6 w-6 text-indigo-400 transition group-hover:scale-110" />
              <div className="font-heading text-2xl font-bold">{value}</div>
              <div className="text-xs text-gray-400">{label}</div>
            </Link>
          ))}
        </div>

        <section className="surface animate-fade-up p-6" style={{ animationDelay: "150ms" }}>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold">About me</h3>
            {!editing && (
              <button onClick={() => { setForm({ name: user.name, bio: user.bio ?? "" }); setEditing(true); }} className="btn-secondary btn-sm">
                <Pencil size={14} /> Edit profile
              </button>
            )}
          </div>

          {editing ? (
            <form onSubmit={save} noValidate className="animate-fade-in space-y-5">
              <FormField label="Display name" icon={User} maxLength={50} value={form.name} error={errors.name}
                onChange={(e) => { setForm((f) => ({ ...f, name: e.target.value })); setErrors((x) => ({ ...x, name: undefined })); }} />
              <div>
                <label htmlFor="bio" className="mb-1.5 block text-sm font-medium text-gray-300">Bio</label>
                <textarea id="bio" rows={3} value={form.bio} aria-invalid={!!errors.bio}
                  onChange={(e) => { setForm((f) => ({ ...f, bio: e.target.value })); setErrors((x) => ({ ...x, bio: undefined })); }}
                  className="field !pl-3" placeholder="Tell other gamers about yourself" />
                <div className="mt-1 flex justify-between text-xs">
                  <span className="text-red-400">{errors.bio}</span>
                  <span className={form.bio.length > 160 ? "text-red-400" : "text-gray-500"}>{form.bio.length}/160</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="btn-primary btn-sm">Save changes</button>
                <button type="button" className="btn-ghost btn-sm" onClick={() => { setEditing(false); setErrors({}); }}>Cancel</button>
              </div>
            </form>
          ) : (
            <p className="text-gray-300">{user.bio || "No bio yet. Click “Edit profile” to add one."}</p>
          )}
        </section>
      </div>
    </div>
  );
}
