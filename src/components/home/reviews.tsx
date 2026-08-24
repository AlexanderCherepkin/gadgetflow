"use client";

import { Quote } from "lucide-react";
import { getHomeReviews } from "@/lib/data/reviews";
import { SectionTitle } from "@/components/ui/section-title";
import { Rating } from "@/components/ui/rating";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function Reviews() {
  const reviews = getHomeReviews();
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="section-padding bg-surface">
      <div className="container-tight">
        <SectionTitle centered subtitle="Реальные отзывы наших покупателей">
          Что говорят клиенты
        </SectionTitle>

        <div
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 shadow-card card-hover"
            >
              <Quote className="h-6 w-6 text-accent mb-4" />
              <Rating value={review.rating} />
              <p className="mt-4 text-sm text-text-secondary leading-relaxed">
                {review.text}
              </p>
              <div className="mt-6 pt-4 border-t border-border">
                <p className="font-medium text-sm">{review.author}</p>
                <p className="text-xs text-text-muted">{review.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
