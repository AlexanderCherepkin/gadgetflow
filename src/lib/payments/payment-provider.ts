export interface PaymentRequest {
  orderId: string;
  orderNumber: string;
  amount: number;
  currency: string;
  description: string;
  customerEmail: string;
  customerPhone: string;
  returnUrl: string;
  cancelUrl: string;
  callbackUrl: string;
}

export interface PaymentResponse {
  success: boolean;
  provider: string;
  paymentId?: string;
  paymentUrl?: string;
  formHtml?: string;
  errorMessage?: string;
}

export interface PaymentWebhookPayload {
  provider: string;
  payload: Record<string, unknown>;
}

export interface PaymentProvider {
  readonly name: string;
  createPayment(request: PaymentRequest): Promise<PaymentResponse>;
  verifyWebhook?(payload: PaymentWebhookPayload): Promise<{
    orderId: string;
    status: "paid" | "failed" | "refunded" | "pending";
    amount?: number;
  }>;
}

export class BePaidProvider implements PaymentProvider {
  readonly name = "bePaid";

  async createPayment(request: PaymentRequest): Promise<PaymentResponse> {
    // Demo / stub implementation. Replace with real bePaid API call when keys are available.
    console.log("[bePaid] create payment request:", request);
    return {
      success: true,
      provider: this.name,
      paymentId: `bp-demo-${Date.now()}`,
      paymentUrl: `/payment/success?orderId=${request.orderId}&provider=${this.name}`,
    };
  }

  async verifyWebhook(payload: PaymentWebhookPayload) {
    const orderId = String(payload.payload?.orderId || "");
    return { orderId, status: "paid" as const, amount: 0 };
  }
}

export class WebPayProvider implements PaymentProvider {
  readonly name = "webpay";

  async createPayment(request: PaymentRequest): Promise<PaymentResponse> {
    console.log("[WebPay] create payment request:", request);
    return {
      success: true,
      provider: this.name,
      paymentId: `wp-demo-${Date.now()}`,
      paymentUrl: `/payment/success?orderId=${request.orderId}&provider=${this.name}`,
    };
  }
}

export class AssistBelarusProvider implements PaymentProvider {
  readonly name = "assist";

  async createPayment(request: PaymentRequest): Promise<PaymentResponse> {
    console.log("[Assist Belarus] create payment request:", request);
    return {
      success: true,
      provider: this.name,
      paymentId: `assist-demo-${Date.now()}`,
      paymentUrl: `/payment/success?orderId=${request.orderId}&provider=${this.name}`,
    };
  }
}

export class ErippProvider implements PaymentProvider {
  readonly name = "erip";

  async createPayment(request: PaymentRequest): Promise<PaymentResponse> {
    console.log("[ЕРИП] create payment request:", request);
    return {
      success: true,
      provider: this.name,
      paymentId: `erip-demo-${Date.now()}`,
      formHtml: `
        <div class="p-4 border rounded-xl bg-surface text-center">
          <p class="mb-2">Оплата через ЕРИП</p>
          <p class="text-sm text-text-secondary mb-4">После подтверждения заказа мы вышлем инструкцию по оплате в ЕРИП.</p>
          <a href="/payment/success?orderId=${request.orderId}&provider=${this.name}" class="inline-flex items-center justify-center px-4 py-2 rounded-full bg-accent text-white">Я оплатил</a>
        </div>
      `,
    };
  }
}

export class DemoPaymentProvider implements PaymentProvider {
  readonly name = "demo";

  async createPayment(request: PaymentRequest): Promise<PaymentResponse> {
    console.log("[DemoPayment] create payment request:", request);
    return {
      success: true,
      provider: this.name,
      paymentId: `demo-${Date.now()}`,
      paymentUrl: `/payment/success?orderId=${request.orderId}&provider=${this.name}`,
    };
  }
}

export function getPaymentProvider(providerName?: string): PaymentProvider {
  const name = providerName || process.env.PAYMENT_PROVIDER || "demo";

  switch (name) {
    case "bePaid":
      return new BePaidProvider();
    case "webpay":
      return new WebPayProvider();
    case "assist":
      return new AssistBelarusProvider();
    case "erip":
      return new ErippProvider();
    case "demo":
    default:
      return new DemoPaymentProvider();
  }
}

export const availablePaymentProviders = [
  { id: "demo", name: "Демо-оплата (для тестирования)" },
  { id: "bePaid", name: "bePaid — Visa, Mastercard, БЕЛКАРТ" },
  { id: "webpay", name: "WebPay — Visa, Mastercard, БЕЛКАРТ" },
  { id: "assist", name: "Assist Belarus — Visa, Mastercard, БЕЛКАРТ" },
  { id: "erip", name: "ЕРИП / онлайн-банк" },
];
