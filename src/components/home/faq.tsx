"use client";

import { faqItems } from "@/lib/data/faq";
import { SectionTitle } from "@/components/ui/section-title";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function HomeFaq() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="section-padding bg-surface">
      <div className="container-tight">
        <SectionTitle centered subtitle="Отвечаем на самые популярные вопросы">
          Частые вопросы
        </SectionTitle>

        <div
          ref={ref}
          className={`max-w-3xl mx-auto bg-white rounded-2xl p-2 md:p-6 shadow-card transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-base md:text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
