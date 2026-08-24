import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Личный кабинет",
};

export default function AccountPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container-tight max-w-xl text-center">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">Личный кабинет</h1>
          <p className="text-text-secondary mb-8">
            Авторизация и личный кабинет появятся на этапе 2. Сейчас оформление заказа доступно без регистрации.
          </p>
          <Button asChild variant="secondary">
            <Link href="/">На главную</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
