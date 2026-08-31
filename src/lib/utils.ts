import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type CurrencyCode = "BYN" | "RUB" | "KZT" | "AMD" | "KGS";

// Курсы конвертации относительно BYN.
// В production должны приходить из актуального источника (ЦБ РБ / НБРБ API).
const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  BYN: 1,
  RUB: 28.5,
  KZT: 150,
  AMD: 150,
  KGS: 28,
};

export function convertPrice(bynPrice: number, targetCurrency: CurrencyCode): number {
  const rate = EXCHANGE_RATES[targetCurrency] ?? 1;
  return Math.round(bynPrice * rate);
}

export function formatPrice(value: number, currency: CurrencyCode = "BYN"): string {
  // Deprecated: prefer <Price /> component to render BYN as an image.
  // Kept for non-UI helpers and server-side formatting.
  const display = currency === "BYN" ? "code" : "symbol";
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency,
    currencyDisplay: display,
    minimumFractionDigits: currency === "BYN" ? 2 : 0,
    maximumFractionDigits: currency === "BYN" ? 2 : 0,
  }).format(value);
}

export function formatPhone(raw: string, prefix: string = "+375"): string {
  const digits = raw.replace(/\D/g, "");
  const prefixDigits = prefix.replace(/\D/g, "");

  // Если пользователь стёр префикс — вернуть его.
  if (!digits.startsWith(prefixDigits)) {
    return prefix;
  }

  const body = digits.slice(prefixDigits.length);

  if (prefix === "+7") {
    // Россия / Казахстан: +7 (XXX) XXX-XX-XX
    if (body.length === 0) return prefix;
    if (body.length <= 3) return `${prefix} (${body}`;
    if (body.length <= 6) return `${prefix} (${body.slice(0, 3)}) ${body.slice(3)}`;
    if (body.length <= 8) return `${prefix} (${body.slice(0, 3)}) ${body.slice(3, 6)}-${body.slice(6)}`;
    return `${prefix} (${body.slice(0, 3)}) ${body.slice(3, 6)}-${body.slice(6, 8)}-${body.slice(8, 10)}`;
  }

  if (prefix === "+375") {
    // Беларусь: +375 (XX) XXX-XX-XX
    if (body.length === 0) return prefix;
    if (body.length <= 2) return `${prefix} (${body}`;
    if (body.length <= 5) return `${prefix} (${body.slice(0, 2)}) ${body.slice(2)}`;
    if (body.length <= 7) return `${prefix} (${body.slice(0, 2)}) ${body.slice(2, 5)}-${body.slice(5)}`;
    return `${prefix} (${body.slice(0, 2)}) ${body.slice(2, 5)}-${body.slice(5, 7)}-${body.slice(7, 9)}`;
  }

  if (prefix === "+374") {
    // Армения: +374 (XX) XXX-XXX
    if (body.length === 0) return prefix;
    if (body.length <= 2) return `${prefix} (${body}`;
    if (body.length <= 5) return `${prefix} (${body.slice(0, 2)}) ${body.slice(2)}`;
    return `${prefix} (${body.slice(0, 2)}) ${body.slice(2, 5)}-${body.slice(5, 8)}`;
  }

  if (prefix === "+996") {
    // Кыргызстан: +996 (XXX) XXX-XXX
    if (body.length === 0) return prefix;
    if (body.length <= 3) return `${prefix} (${body}`;
    if (body.length <= 6) return `${prefix} (${body.slice(0, 3)}) ${body.slice(3)}`;
    return `${prefix} (${body.slice(0, 3)}) ${body.slice(3, 6)}-${body.slice(6, 9)}`;
  }

  // Fallback: просто возвращаем префикс + цифры без форматирования.
  return `${prefix} ${body}`;
}
