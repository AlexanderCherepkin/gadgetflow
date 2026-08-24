import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductDetail } from "@/components/catalog/product-detail";
import { products } from "@/lib/data/products";

interface ProductPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({
    category: p.category,
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  return {
    title: product?.name,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { category, slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product || product.category !== category) return notFound();

  return (
    <>
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <ProductDetail product={product} />
      </main>
      <Footer />
    </>
  );
}
