import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CheckoutForm } from "@/components/cart/checkout-form";

export const metadata = {
  title: "Оформление заказа",
};

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <CheckoutForm />
      </main>
      <Footer />
    </>
  );
}
