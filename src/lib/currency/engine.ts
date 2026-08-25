import { createClient } from "@/lib/supabase/server";

export type CurrencyCode = "BYN" | "RUB";

const RATE_SOURCES: Record<string, string> = {
  BYN_RUB:
    "https://api.exchangerate.host/latest?base=BYN&symbols=RUB&source=nbrb",
  RUB_BYN:
    "https://api.exchangerate.host/latest?base=RUB&symbols=BYN&source=nbrb",
};

export async function fetchCurrencyRate(
  base: CurrencyCode,
  target: CurrencyCode
): Promise<number | null> {
  if (base === target) return 1;

  try {
    const url = `https://api.exchangerate.host/convert?from=${base}&to=${target}`;
    const response = await fetch(url, { next: { revalidate: 3600 } });
    if (!response.ok) return null;
    const data = await response.json();
    const rate = data?.result || data?.info?.rate;
    return typeof rate === "number" ? rate : null;
  } catch (error) {
    console.error(`Currency rate fetch error ${base}->${target}:`, error);
    return null;
  }
}

export async function updateCurrencyRates(): Promise<{
  bynRub: number | null;
  rubByn: number | null;
}> {
  const [bynRub, rubByn] = await Promise.all([
    fetchCurrencyRate("BYN", "RUB"),
    fetchCurrencyRate("RUB", "BYN"),
  ]);

  const supabase = await createClient();

  if (bynRub) {
    await supabase.from("currency_rates").upsert(
      {
        base_currency: "BYN",
        target_currency: "RUB",
        rate: bynRub,
        source: "exchangerate.host",
        fetched_at: new Date().toISOString(),
      },
      { onConflict: "base_currency,target_currency" }
    );
  }

  if (rubByn) {
    await supabase.from("currency_rates").upsert(
      {
        base_currency: "RUB",
        target_currency: "BYN",
        rate: rubByn,
        source: "exchangerate.host",
        fetched_at: new Date().toISOString(),
      },
      { onConflict: "base_currency,target_currency" }
    );
  }

  return { bynRub, rubByn };
}

export async function getCurrencyRate(
  base: CurrencyCode,
  target: CurrencyCode
): Promise<number> {
  if (base === target) return 1;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("currency_rates")
    .select("rate")
    .eq("base_currency", base)
    .eq("target_currency", target)
    .single();

  if (error || !data) {
    // Fallback manual rates if DB not seeded
    if (base === "BYN" && target === "RUB") return 28.5;
    if (base === "RUB" && target === "BYN") return 0.0351;
    return 1;
  }

  return data.rate;
}

export async function convertPrice(
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode
): Promise<number> {
  if (from === to) return amount;
  const rate = await getCurrencyRate(from, to);
  return Math.round(amount * rate * 100) / 100;
}

export function formatCurrencyPrice(
  amount: number,
  currency: CurrencyCode
): string {
  if (currency === "RUB") {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }
  return new Intl.NumberFormat("be-BY", {
    style: "currency",
    currency: "BYN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
