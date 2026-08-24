import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { NewsCards } from "@/components/home/news-cards";

export const metadata = {
  title: "Новости и блог",
};

export default function NewsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container-tight">
          <h1 className="text-3xl md:text-4xl font-semibold mb-8">Новости и блог</h1>
          <NewsCards />
        </div>
      </main>
      <Footer />
    </>
  );
}
