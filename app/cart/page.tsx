"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { CheckCircle2, CreditCard, Lock, Minus, Plus, ShoppingCart, Tag, Trash2, User, X } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "@/lib/providers/cart-provider";
import { useAuth } from "@/lib/providers/auth-provider";
import { useCollection } from "@/lib/providers/collection-provider";
import { money } from "@/lib/format";
import { Errors, validateCheckout } from "@/lib/validation";
import { coupons } from "@/lib/data/coupons";
import GameImage from "@/components/ui/GameImage";
import FormField from "@/components/ui/FormField";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import { Skeleton } from "@/components/ui/Skeletons";

type CheckoutErrors = Errors<"name" | "card" | "expiry" | "cvc">;

const fmtCard = (v: string) => v.replace(/\D/g, "").slice(0, 19).replace(/(.{4})/g, "$1 ").trim();
const fmtExpiry = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

export default function CartPage() {
  const { cart, hydrated, subtotal, discount, total, coupon, updateQuantity, removeItem, clear, applyCoupon, removeCoupon } = useCart();
  const { user, loading: authLoading } = useAuth();
  const { addToLibrary } = useCollection();

  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string | null>(null);
  const [checkout, setCheckout] = useState(false);
  const [form, setForm] = useState({ name: "", card: "", expiry: "", cvc: "" });
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [paying, setPaying] = useState(false);
  const [done, setDone] = useState<{ count: number; total: number } | null>(null);

  const set = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onApply = (e: FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return setCodeError("Enter a promo code");
    const err = applyCoupon(code);
    setCodeError(err);
    if (!err) setCode("");
  };

  const onPay = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validateCheckout(form);
    setErrors(errs);
    if (Object.keys(errs).length) return toast.error("Please fix the highlighted fields");

    setPaying(true);
    await new Promise((r) => setTimeout(r, 1500)); // simulated payment
    addToLibrary(cart.map((i) => i.id));
    setDone({ count: cart.reduce((a, i) => a + i.quantity, 0), total });
    clear();
    setPaying(false);
    setCheckout(false);
  };

  if (done) {
    return (
      <div className="container py-16">
        <div className="surface animate-fade-up mx-auto max-w-lg px-6 py-14 text-center">
          <CheckCircle2 className="animate-pop mx-auto h-20 w-20 text-emerald-400" />
          <h1 className="mt-6 font-heading text-3xl font-bold">Payment successful!</h1>
          <p className="mt-3 text-gray-400">
            {done.count} {done.count === 1 ? "game" : "games"} added to your library. You paid {money(done.total)}.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/account/library" className="btn-primary">Go to library</Link>
            <Link href="/store" className="btn-secondary">Keep shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <PageHeader title="Your Cart" />

      {!authLoading && !user ? (
        <EmptyState icon={Lock} title="Log in to view your cart" text="Sign in to add games to your cart and check out." href="/login?next=/cart" cta="Log in" />
      ) : !hydrated ? (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {[0, 1].map((i) => <Skeleton key={i} className="h-32 w-full !rounded-2xl" />)}
          </div>
          <Skeleton className="h-72 w-full !rounded-2xl" />
        </div>
      ) : cart.length === 0 ? (
        <EmptyState icon={ShoppingCart} title="Your cart is empty" text="Looks like you haven't added any games yet." href="/store" cta="Browse the store" />
      ) : (
        <div className="grid items-start gap-8 lg:grid-cols-3">
          <ul className="space-y-4 lg:col-span-2" aria-label="Cart items">
            {cart.map((item) => (
              <li key={item.id} className="surface animate-fade-up flex items-center gap-4 p-4">
                <Link href={`/games/${item.id}`} className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg sm:h-24 sm:w-40">
                  <GameImage src={item.image} alt={item.title} sizes="160px" />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link href={`/games/${item.id}`} className="block truncate text-lg font-semibold hover:text-indigo-300">
                    {item.title}
                  </Link>
                  <p className="text-sm text-gray-400">
                    {item.price === 0 ? "Free" : money(item.price)}
                    {item.originalPrice > item.price && <span className="ml-2 text-gray-600 line-through">{money(item.originalPrice)}</span>}
                  </p>
                  <div className="mt-3 inline-flex items-center rounded-full border border-white/10">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      aria-label={`Decrease quantity of ${item.title}`}
                      className="rounded-l-full p-2 transition hover:bg-white/10 disabled:opacity-30"
                    >
                      <Minus size={14} />
                    </button>
                    <span key={item.quantity} className="animate-pop w-8 text-center text-sm font-semibold" aria-live="polite">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= 5}
                      aria-label={`Increase quantity of ${item.title}`}
                      className="rounded-r-full p-2 transition hover:bg-white/10 disabled:opacity-30"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <div className="hidden text-right font-semibold sm:block">{money(item.price * item.quantity)}</div>
                <button
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.title}`}
                  className="rounded-full p-2 text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
                >
                  <Trash2 size={20} />
                </button>
              </li>
            ))}
          </ul>

          <aside className="surface space-y-5 p-6 lg:sticky lg:top-24">
            <h2 className="font-heading text-xl font-bold">Summary</h2>

            {coupon ? (
              <div className="animate-fade-in flex items-center justify-between rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
                <span className="flex items-center gap-2"><Tag size={14} /> {coupon.code}: {coupon.label}</span>
                <button onClick={removeCoupon} aria-label="Remove promo code"><X size={16} /></button>
              </div>
            ) : (
              <form onSubmit={onApply} noValidate>
                <div className="flex gap-2">
                  <input
                    value={code}
                    onChange={(e) => { setCode(e.target.value.toUpperCase()); setCodeError(null); }}
                    placeholder="Promo code"
                    aria-label="Promo code"
                    aria-invalid={!!codeError}
                    maxLength={20}
                    className="field !pl-3"
                  />
                  <button className="btn-secondary btn-sm shrink-0">Apply</button>
                </div>
                {codeError ? (
                  <p role="alert" className="field-error">{codeError}</p>
                ) : (
                  <p className="mt-1.5 text-xs text-gray-500">Try {coupons[0].code} or {coupons[1].code}</p>
                )}
              </form>
            )}

            <dl className="space-y-2 text-gray-300">
              <div className="flex justify-between"><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div>
              <div className="flex justify-between"><dt>Discount</dt><dd className={discount ? "text-emerald-400" : ""}>-{money(discount)}</dd></div>
              <div className="flex justify-between border-t border-white/10 pt-3 text-lg font-bold text-white"><dt>Total</dt><dd>{money(total)}</dd></div>
            </dl>

            {authLoading ? null : !user ? (
              <Link href="/login?next=/cart" className="btn-primary w-full">
                <User size={18} /> Log in to checkout
              </Link>
            ) : (
              <button className="btn-primary w-full" onClick={() => setCheckout(true)}>
                <Lock size={18} /> Proceed to Checkout
              </button>
            )}
            <Link href="/store" className="block text-center text-sm text-gray-400 hover:text-white">Continue shopping</Link>
          </aside>
        </div>
      )}

      {/* Checkout modal */}
      {checkout && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fade-in" role="dialog" aria-modal="true" aria-label="Checkout">
          <form onSubmit={onPay} noValidate className="surface animate-fade-up w-full max-w-md space-y-5 p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold">Secure checkout</h2>
              <button type="button" onClick={() => !paying && setCheckout(false)} aria-label="Close checkout" className="rounded-full p-1 hover:bg-white/10">
                <X />
              </button>
            </div>
            <FormField label="Name on card" icon={User} value={form.name} onChange={(e) => set("name", e.target.value)} error={errors.name} autoComplete="cc-name" placeholder="John Doe" />
            <FormField label="Card number" icon={CreditCard} inputMode="numeric" autoComplete="cc-number" value={form.card} onChange={(e) => set("card", fmtCard(e.target.value))} error={errors.card} placeholder="4242 4242 4242 4242" hint="Demo only. Use 4242 4242 4242 4242" />
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Expiry" inputMode="numeric" autoComplete="cc-exp" value={form.expiry} onChange={(e) => set("expiry", fmtExpiry(e.target.value))} error={errors.expiry} placeholder="MM/YY" />
              <FormField label="CVC" inputMode="numeric" autoComplete="cc-csc" maxLength={4} value={form.cvc} onChange={(e) => set("cvc", e.target.value.replace(/\D/g, ""))} error={errors.cvc} placeholder="123" />
            </div>
            <button className="btn-primary w-full" disabled={paying}>
              {paying ? (<><span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> Processing…</>) : `Pay ${money(total)}`}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
