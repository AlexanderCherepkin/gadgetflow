"use client";

import Image from "next/image";
import Link from "next/link";
import { getLatestArticles } from "@/lib/data/articles";
import { SectionTitle } from "@/components/ui/section-title";
import { Badge } from "@/components/ui/badge";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function NewsCards() {
  const articles = getLatestArticles();
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="section-padding bg-white">
      <div className="container-tight">
        <SectionTitle subtitle="Гидов, обзоров и новостей из мира технологий">
          Блог GadgetFlow
        </SectionTitle>

        <div
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/news/${article.slug}`}
              className="group flex flex-col bg-surface rounded-2xl overflow-hidden card-hover"
            >
              <div className="relative aspect-[16/10] image-hover">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <Badge variant="outline" className="self-start mb-3">
                  {article.category}
                </Badge>
                <h3 className="text-lg font-semibold leading-snug mb-2 group-hover:text-accent transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-text-secondary line-clamp-2 mb-4">
                  {article.excerpt}
                </p>
                <span className="mt-auto text-xs text-text-muted">{article.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
