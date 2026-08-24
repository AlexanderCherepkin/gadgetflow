import { Article } from "./index";

export const articles: Article[] = [
  {
    id: "a1",
    slug: "kak-vybrat-smart-chasy",
    title: "Как выбрать смарт-часы: гид для начинающих",
    category: "Гид",
    image: "/images/news/smartwatch-guide.jpg",
    date: "2026-08-18",
    excerpt:
      "Разбираемся в экосистемах, датчиках и автономности, чтобы найти идеальную модель под ваш ритм жизни.",
  },
  {
    id: "a2",
    slug: "besprovodnye-naushniki-2026",
    title: "Лучшие беспроводные наушники 2026 года",
    category: "Подборка",
    image: "/images/news/headphones-2026.jpg",
    date: "2026-08-12",
    excerpt:
      "Сравниваем флагманы и доступные модели по звуку, шумоподавлению и удобству повседневного использования.",
  },
  {
    id: "a3",
    slug: "umnyy-dom-dlya-novichkov",
    title: "Умный дом для новичков: с чего начать",
    category: "Гид",
    image: "/images/news/smart-home.jpg",
    date: "2026-08-02",
    excerpt:
      "Простая схема первых покупок: хаб, лампы, розетки и датчики, которые сделают квартиру умнее без лишних сложностей.",
  },
];

export function getLatestArticles(): Article[] {
  return articles.slice(0, 3);
}
