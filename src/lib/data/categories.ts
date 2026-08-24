import { Category, NavCategory } from "./index";

export const categories: Category[] = [
  {
    id: "smartfony",
    name: "Смартфоны",
    slug: "smartfony",
    image: "/images/collections/smartphones.svg",
    description: "Флагманы и надёжные модели на каждый день",
  },
  {
    id: "smart-chasy",
    name: "Смарт-часы",
    slug: "smart-chasy",
    image: "/images/collections/watches.svg",
    description: "Трекеры активности и умные часы",
  },
  {
    id: "audio",
    name: "Аудио",
    slug: "audio",
    image: "/images/collections/headphones.svg",
    description: "Наушники и портативная акустика",
  },
  {
    id: "noutbuki",
    name: "Ноутбуки",
    slug: "noutbuki",
    image: "/images/collections/laptops.svg",
    description: "Ноутбуки и периферия для работы и учёбы",
  },
  {
    id: "umnyy-dom",
    name: "Умный дом",
    slug: "umnyy-dom",
    image: "/images/collections/smarthome.svg",
    description: "Устройства для комфорта и автоматизации дома",
  },
  {
    id: "aksessuary",
    name: "Аксессуары",
    slug: "aksessuary",
    image: "/images/collections/accessories.svg",
    description: "Чехлы, зарядные устройства, кабели",
  },
  {
    id: "rasprodazha",
    name: "Распродажа",
    slug: "rasprodazha",
    image: "/images/collections/sale.svg",
    description: "Лучшие предложения и скидки",
  },
];

export const navCategories: NavCategory[] = [
  { name: "Смартфоны", slug: "smartfony" },
  { name: "Смарт-часы", slug: "smart-chasy" },
  { name: "Аудио", slug: "audio" },
  { name: "Ноутбуки", slug: "noutbuki" },
  { name: "Умный дом", slug: "umnyy-dom" },
  { name: "Аксессуары", slug: "aksessuary" },
  { name: "Распродажа", slug: "rasprodazha" },
];
