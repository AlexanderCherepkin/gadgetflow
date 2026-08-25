import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductGrid } from "@/components/catalog/product-grid";
import { categories, navCategories } from "@/lib/data/categories";
import { products } from "@/lib/data/products";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return navCategories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params;
  const cat = navCategories.find((c) => c.slug === category);
  return {
    title: cat ? cat.name : "Каталог",
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const cat = navCategories.find((c) => c.slug === category);
  if (!cat) return notFound();

  const categoryDef = categories.find((c) => c.slug === category);
  const items = products.filter((p) => p.category === category || category === "rasprodazha");

  return (
    <>
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container-tight">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">{cat.name}</h1>
          {categoryDef && (
            <p className="text-text-secondary mb-8 max-w-2xl">{categoryDef.description}</p>
          )}
          <ProductGrid products={items} enableFilters />
        </div>
      </main>
      <Footer />
    </>
  );
}
