import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WishlistContent } from "@/components/cart/wishlist-content";

export const metadata = {
  title: "Избранное",
};

export default function WishlistPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container-tight">
          <WishlistContent />
        </div>
      </main>
      <Footer />
    </>
  );
}
