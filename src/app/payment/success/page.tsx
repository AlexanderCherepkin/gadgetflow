import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const metadata = {
  title: "Оплата прошла успешно",
};

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 text-success mb-6">
        <Check className="h-10 w-10" />
      </div>
      <h1 className="text-3xl md:text-4xl font-semibold mb-4">Оплата прошла успешно</h1>
      <p className="text-text-secondary mb-8 max-w-md">
        Спасибо за покупку! Мы свяжемся с вами для подтверждения деталей заказа.
      </p>
      <Button asChild>
        <Link href="/">Вернуться на главную</Link>
      </Button>
    </div>
  );
}
