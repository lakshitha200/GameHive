export type Coupon = { code: string; label: string; percent?: number; amount?: number; minSpend?: number };

export const coupons: Coupon[] = [
  { code: "GAMEHIVE10", label: "10% off your order", percent: 10 },
  { code: "WELCOME5", label: "$5 off orders over $20", amount: 5, minSpend: 20 },
  { code: "LEVELUP20", label: "20% off orders over $60", percent: 20, minSpend: 60 },
];

export function checkCoupon(code: string, subtotal: number): { ok: true; coupon: Coupon } | { ok: false; error: string } {
  const c = coupons.find((x) => x.code === code.trim().toUpperCase());
  if (!c) return { ok: false, error: "That code isn't valid" };
  if (c.minSpend && subtotal < c.minSpend) return { ok: false, error: `Spend at least $${c.minSpend} to use ${c.code}` };
  return { ok: true, coupon: c };
}

export const couponDiscount = (c: Coupon | null, subtotal: number) =>
  !c ? 0 : Math.min(subtotal, c.percent ? Math.round(subtotal * c.percent) / 100 : (c.amount ?? 0));
