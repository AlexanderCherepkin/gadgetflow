import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSlider } from "@/components/home/hero-slider";
import { CollectionCards } from "@/components/home/collection-cards";
import { FeaturedProducts } from "@/components/home/featured-products";
import { SplitBanner } from "@/components/home/split-banner";
import { ValueProposition } from "@/components/home/value-proposition";
import { ProductShowcase } from "@/components/home/product-showcase";
import { BenefitsStrip } from "@/components/home/benefits-strip";
import { Reviews } from "@/components/home/reviews";
import { NewsCards } from "@/components/home/news-cards";
import { HomeFaq } from "@/components/home/faq";
import { Gallery } from "@/components/home/gallery";
import { Subscribe } from "@/components/home/subscribe";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSlider />
        <CollectionCards />
        <FeaturedProducts />
        <SplitBanner />
        <ValueProposition />
        <ProductShowcase />
        <BenefitsStrip />
        <Reviews />
        <NewsCards />
        <HomeFaq />
        <Gallery />
        <Subscribe />
      </main>
      <Footer />
    </>
  );
}
