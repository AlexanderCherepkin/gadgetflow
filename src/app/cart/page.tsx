import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartContent } from "@/components/cart/cart-content";

export const metadata = {
  title: "Корзина",
};

export default function CartPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <CartContent />
      </main>
      <Footer />
    </>
  );
}
