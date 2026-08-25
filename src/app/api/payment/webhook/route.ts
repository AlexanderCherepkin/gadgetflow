import { NextRequest, NextResponse } from "next/server";
import { getPaymentProvider } from "@/lib/payments/payment-provider";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const providerName = String(body?.provider || "demo");
    const provider = getPaymentProvider(providerName);

    if (!provider.verifyWebhook) {
      return NextResponse.json({ ok: true });
    }

    const result = await provider.verifyWebhook({
      provider: providerName,
      payload: body,
    });

    const supabase = await createClient();

    // Update payment record
    await supabase.from("payments").upsert({
      order_id: result.orderId,
      provider: providerName,
      status: result.status,
      amount_byn: result.amount ?? 0,
      payload: body,
      paid_at: result.status === "paid" ? new Date().toISOString() : null,
    });

    // Update order status
    if (result.status === "paid") {
      await supabase
        .from("orders")
        .update({
          status: "paid",
          payment_status: "paid",
          updated_at: new Date().toISOString(),
        })
        .eq("id", result.orderId);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Payment webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
