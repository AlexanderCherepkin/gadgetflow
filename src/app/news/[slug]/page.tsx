import { notFound } from "next/navigation";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { articles } from "@/lib/data/articles";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  return { title: article?.title };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return notFound();

  return (
    <>
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container-tight max-w-3xl">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-accent-subtle text-accent text-xs font-semibold">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">{article.title}</h1>
          <p className="text-sm text-text-muted mb-8">{article.date}</p>
          <p className="text-lg text-text-secondary leading-relaxed">{article.excerpt}</p>
          <div className="mt-8 space-y-4 text-text-secondary leading-relaxed">
            <p>
              Здесь будет полный текст статьи. В MVP используется демонстрационный контент для проверки макета, навигации и структуры раздела блога.
            </p>
            <p>
              В дальнейшем статьи можно расширить реальными материалами: гидами по выбору техники, обзорами новинок, советами по использованию устройств и новостями компании.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
