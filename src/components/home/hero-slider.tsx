"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SLIDE_INTERVAL = 8000;

const slides = [
  {
    id: 1,
    badge: "Новинка",
    title: "Wireless Sound Revolution",
    subtitle: "Погрузитесь в чистый звук с новыми беспроводными наушниками",
    cta: "Смотреть каталог",
    href: "/catalog/audio",
    video: { mp4: "/videos/headphones.mp4", webm: "/videos/headphones.webm", poster: "/videos/headphones-poster.jpg" },
    bg: "linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)",
  },
  {
    id: 2,
    badge: "Хит сезона",
    title: "Smart Watches Reimagined",
    subtitle: "Контролируйте здоровье, активность и уведомления одним касанием",
    cta: "Выбрать часы",
    href: "/catalog/smart-chasy",
    video: { mp4: "/videos/watch.mp4", webm: "/videos/watch.webm", poster: "/videos/watch-poster.jpg" },
    bg: "linear-gradient(135deg, #f0f9ff 0%, #f8fafc 100%)",
  },
  {
    id: 3,
    badge: "Умный дом",
    title: "Smart Home Ecosystem",
    subtitle: "Управляйте освещением, климатом и безопасностью из одного приложения",
    cta: "Создать уют",
    href: "/catalog/umnyy-dom",
    video: { mp4: "/videos/smarthome.mp4", webm: "/videos/smarthome.webm", poster: "/videos/smarthome-poster.jpg" },
    bg: "linear-gradient(135deg, #ecfdf5 0%, #f8fafc 100%)",
  },
  {
    id: 4,
    badge: "Аксессуары",
    title: "Power & Connectivity",
    subtitle: "Зарядные станции, кабели и адаптеры для любого рабочего места",
    cta: "Подобрать аксессуары",
    href: "/catalog/aksessuary",
    video: { mp4: "/videos/accessories.mp4", webm: "/videos/accessories.webm", poster: "/videos/accessories-poster.jpg" },
    bg: "linear-gradient(135deg, #fef3c7 0%, #f8fafc 100%)",
  },
  {
    id: 5,
    badge: "Игровой сетап",
    title: "Next-Level Gaming",
    subtitle: "Мыши, клавиатуры, наушники и подсветка для побед в каждой игре",
    cta: "В игру",
    href: "/catalog/igrovye-aksessuary",
    video: { mp4: "/videos/gaming.mp4", webm: "/videos/gaming.webm", poster: "/videos/gaming-poster.jpg" },
    bg: "linear-gradient(135deg, #f3e8ff 0%, #f8fafc 100%)",
  },
  {
    id: 6,
    badge: "Работа & учёба",
    title: "Laptops & Productivity",
    subtitle: "Ноутбуки, мониторы и периферия для эффективных задач",
    cta: "Выбрать технику",
    href: "/catalog/noutbuki",
    video: { mp4: "/videos/laptops.mp4", webm: "/videos/laptops.webm", poster: "/videos/laptops-poster.jpg" },
    bg: "linear-gradient(135deg, #fee2e2 0%, #f8fafc 100%)",
  },
  {
    id: 7,
    badge: "Neon Vibe",
    title: "RGB Everything",
    subtitle: "Светодиодные ленты, лампы и аксессуары с настраиваемой подсветкой",
    cta: "Зажечь атмосферу",
    href: "/catalog/svetodiodnaya-lenta",
    video: { mp4: "/videos/neon-gaming.mp4", webm: "/videos/neon-gaming.webm", poster: "/videos/neon-gaming-poster.jpg" },
    bg: "linear-gradient(135deg, #fce7f3 0%, #f8fafc 100%)",
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [reset, setReset] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [reset]);

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
    setReset((r) => r + 1);
  }, []);

  return (
    <section className="relative overflow-hidden" data-testid="hero-slider">
      <div className="container-tight">
        <div
          className="relative rounded-none md:rounded-3xl overflow-hidden min-h-[480px] md:min-h-[560px] lg:min-h-[640px] flex items-center"
          style={{ background: slides[current].bg }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              data-testid="hero-slide"
              className="grid md:grid-cols-2 gap-8 items-center w-full px-6 md:px-12 lg:px-16 py-12 md:py-0"
            >
              <div className="order-2 md:order-1 z-10">
                <span className="inline-block mb-4 px-3 py-1 rounded-full bg-accent-subtle text-accent text-xs font-semibold">
                  {slides[current].badge}
                </span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-4">
                  {slides[current].title}
                </h1>
                <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-md">
                  {slides[current].subtitle}
                </p>
                <Button asChild size="lg">
                  <a href={slides[current].href}>{slides[current].cta}</a>
                </Button>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="order-1 md:order-2 relative h-[260px] md:h-[420px] lg:h-[500px] rounded-2xl overflow-hidden"
              >
                <video
                  key={slides[current].video.mp4}
                  autoPlay
                  muted
                  playsInline
                  preload="auto"
                  poster={slides[current].video.poster}
                  className="w-full h-full object-cover"
                  aria-label={slides[current].title}
                >
                  <source src={slides[current].video.webm} type="video/webm" />
                  <source src={slides[current].video.mp4} type="video/mp4" />
                </video>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={cn(
                  "relative h-11 w-11 flex items-center justify-center rounded-full transition-all duration-300",
                  idx === current ? "w-14" : ""
                )}
                aria-label={`Перейти к слайду ${idx + 1}`}
              >
                <span
                  className={cn(
                    "block rounded-full transition-all duration-300",
                    idx === current
                      ? "h-2.5 w-10 bg-accent"
                      : "h-2.5 w-2.5 bg-border hover:bg-[var(--text-muted)]"
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
