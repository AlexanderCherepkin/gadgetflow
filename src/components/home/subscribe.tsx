"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionTitle } from "@/components/ui/section-title";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function Subscribe() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="section-padding bg-foreground text-white">
      <div className="container-tight">
        <div
          ref={ref}
          className={`max-w-2xl mx-auto text-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <SectionTitle className="text-white" centered subtitle="Получайте первыми новости о скидках, новинках и специальных предложениях">
            Подпишитесь на рассылку
          </SectionTitle>

          {submitted ? (
            <p className="text-lg text-white/90">Спасибо! Мы пришлём письмо на {email}</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Ваш email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-white"
              />
              <Button type="submit" size="lg" className="shrink-0 bg-white text-foreground hover:bg-white/90">
                Подписаться
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
