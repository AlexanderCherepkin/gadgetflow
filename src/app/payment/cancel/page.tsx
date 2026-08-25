import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Оплата отменена",
};

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl md:text-4xl font-semibold mb-4">Оплата отменена</h1>
      <p className="text-text-secondary mb-8 max-w-md">
        Вы отменили оплату. Товар зарезервирован не был. Если возникли вопросы — свяжитесь с нами.
      </p>
      <div className="flex gap-3">
        <Button asChild variant="secondary">
          <Link href="/cart">В корзину</Link>
        </Button>
        <Button asChild>
          <Link href="/">На главную</Link>
        </Button>
      </div>
    </div>
  );
}
