export type Errors<T extends string> = Partial<Record<T, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const validateEmail = (v: string) => {
  if (!v.trim()) return "Email is required";
  if (!EMAIL.test(v.trim())) return "Enter a valid email address";
};

export const validatePassword = (v: string) => {
  if (!v) return "Password is required";
  if (v.length < 8) return "At least 8 characters";
  if (!/[A-Za-z]/.test(v) || !/\d/.test(v)) return "Use letters and at least one number";
};

export const validateName = (v: string) => {
  const t = v.trim();
  if (!t) return "Name is required";
  if (t.length < 2) return "Name is too short";
  if (t.length > 50) return "Name must be under 50 characters";
};

/** Returns 0-4 */
export const passwordStrength = (v: string) => {
  let s = 0;
  if (v.length >= 8) s++;
  if (/[A-Z]/.test(v) && /[a-z]/.test(v)) s++;
  if (/\d/.test(v)) s++;
  if (/[^A-Za-z0-9]/.test(v) || v.length >= 12) s++;
  return s;
};

export function validateLogin(d: { email: string; password: string }) {
  const e: Errors<"email" | "password"> = {};
  const em = validateEmail(d.email);
  if (em) e.email = em;
  if (!d.password) e.password = "Password is required";
  return e;
}

export function validateSignup(d: { name: string; email: string; password: string; confirm: string }) {
  const e: Errors<"name" | "email" | "password" | "confirm"> = {};
  const n = validateName(d.name);
  if (n) e.name = n;
  const em = validateEmail(d.email);
  if (em) e.email = em;
  const pw = validatePassword(d.password);
  if (pw) e.password = pw;
  if (!d.confirm) e.confirm = "Please confirm your password";
  else if (d.confirm !== d.password) e.confirm = "Passwords do not match";
  return e;
}

export function validateContact(d: { name: string; email: string; subject: string; message: string }) {
  const e: Errors<"name" | "email" | "subject" | "message"> = {};
  const n = validateName(d.name);
  if (n) e.name = n;
  const em = validateEmail(d.email);
  if (em) e.email = em;
  if (!d.subject) e.subject = "Pick a topic";
  const m = d.message.trim();
  if (!m) e.message = "Message is required";
  else if (m.length < 10) e.message = "Tell us a bit more (10+ characters)";
  else if (m.length > 500) e.message = "Keep it under 500 characters";
  return e;
}

export function validateProfile(d: { name: string; bio: string }) {
  const e: Errors<"name" | "bio"> = {};
  const n = validateName(d.name);
  if (n) e.name = n;
  if (d.bio.length > 160) e.bio = "Bio must be 160 characters or less";
  return e;
}

/** Card number (Luhn), expiry MM/YY, CVC */
export function validateCheckout(d: { name: string; card: string; expiry: string; cvc: string }) {
  const e: Errors<"name" | "card" | "expiry" | "cvc"> = {};
  const n = validateName(d.name);
  if (n) e.name = n;

  const digits = d.card.replace(/\s/g, "");
  if (!/^\d{13,19}$/.test(digits)) e.card = "Enter a valid card number";
  else {
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
      let x = Number(digits[digits.length - 1 - i]);
      if (i % 2 === 1) {
        x *= 2;
        if (x > 9) x -= 9;
      }
      sum += x;
    }
    if (sum % 10 !== 0) e.card = "Card number is invalid";
  }

  const m = /^(\d{2})\/(\d{2})$/.exec(d.expiry);
  if (!m) e.expiry = "Use MM/YY";
  else {
    const mm = Number(m[1]);
    const yy = 2000 + Number(m[2]);
    const now = new Date();
    if (mm < 1 || mm > 12) e.expiry = "Invalid month";
    else if (yy < now.getFullYear() || (yy === now.getFullYear() && mm < now.getMonth() + 1)) e.expiry = "Card has expired";
  }

  if (!/^\d{3,4}$/.test(d.cvc)) e.cvc = "3-4 digits";
  return e;
}
