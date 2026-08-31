import { NextResponse } from "next/server";

export async function POST() {
  const { updateCurrencyRates } = await import("@/lib/currency/engine");
  const result = await updateCurrencyRates();

  if (!result.bynRub || !result.rubByn) {
    return NextResponse.json(
      { error: "Не удалось обновить курсы валют", result },
      { status: 502 }
    );
  }

  return NextResponse.json({
    success: true,
    rates: {
      BYN_RUB: result.bynRub,
      RUB_BYN: result.rubByn,
    },
    updatedAt: new Date().toISOString(),
  });
}
