import { NextRequest, NextResponse } from "next/server";
import { getPaymentProvider } from "@/lib/payments/payment-provider";
import { createOrder } from "@/lib/supabase/orders";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customer,
      items,
      total_byn,
      delivery_cost_byn,
      delivery_method,
      payment_method,
      currency,
    } = body;

    // 1. Create order in database
    const order = await createOrder({
      customer,
      items,
      total_byn,
      delivery_cost_byn,
      delivery_method,
      payment_method,
      currency,
    });

    if (!order) {
      return NextResponse.json(
        { error: "Не удалось создать заказ" },
        { status: 500 }
      );
    }

    // 2. Create payment via selected provider
    const provider = getPaymentProvider(payment_method);
    const origin = request.headers.get("origin") || "";
    const payment = await provider.createPayment({
      orderId: order.id,
      orderNumber: order.order_number,
      amount: total_byn,
      currency,
      description: `Оплата заказа ${order.order_number}`,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      returnUrl: `${origin}/payment/success`,
      cancelUrl: `${origin}/payment/cancel`,
      callbackUrl: `${origin}/api/payment/webhook`,
    });

    return NextResponse.json({ order, payment });
  } catch (error) {
    console.error("Payment create error:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
