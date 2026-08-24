"use client";

import Image from "next/image";
import { SectionTitle } from "@/components/ui/section-title";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const images = [
  "/images/gallery/1.jpg",
  "/images/gallery/2.jpg",
  "/images/gallery/3.jpg",
  "/images/gallery/4.jpg",
  "/images/gallery/5.jpg",
  "/images/gallery/6.jpg",
];

export function Gallery() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="section-padding bg-white">
      <div className="container-tight">
        <SectionTitle centered subtitle="Следите за нами в социальных сетях и вдохновляйтесь новинками">
          GadgetFlow lifestyle
        </SectionTitle>

        <div
          ref={ref}
          className={`grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {images.map((src, idx) => (
            <a
              key={idx}
              href="https://instagram.com/gadgetflow"
              target="_blank"
              rel="noreferrer"
              className="relative aspect-square overflow-hidden rounded-2xl image-hover group"
            >
              <Image src={src} alt="Lifestyle" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://instagram.com/gadgetflow"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-accent font-medium hover:underline"
          >
            Следите за нами @gadgetflow
          </a>
        </div>
      </div>
    </section>
  );
}
