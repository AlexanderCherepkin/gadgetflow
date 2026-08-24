import { Product } from "./index";

export const products: Product[] = [
  {
    id: "p1",
    name: "Apple iPhone 15 128 GB",
    slug: "apple-iphone-15-128gb",
    category: "smartfony",
    brand: "Apple",
    price: 82990,
    oldPrice: 89990,
    rating: 4.8,
    reviews: 124,
    image: "/images/products/iphone15.jpg",
    inStock: true,
    badge: "Хит",
    shortDescription: "Динамический остров, 48 Мп камера, USB-C.",
    description:
      "iPhone 15 открывает новую эру портретов. 48-мегапиксельная основная камера делает детализированные снимки, а Dynamic Island показывает важные уведомления без прерывания текущих дел.",
    specs: {
      Экран: "6,1\" Super Retina XDR",
      Процессор: "A16 Bionic",
      Память: "128 ГБ",
      Камера: "48 Мп + 12 Мп",
      Аккумулятор: "до 20 часов видео",
    },
    variants: [
      { label: "Цвет", value: "Чёрный" },
      { label: "Память", value: "128 ГБ" },
    ],
  },
  {
    id: "p2",
    name: "Samsung Galaxy S24 256 GB",
    slug: "samsung-galaxy-s24-256gb",
    category: "smartfony",
    brand: "Samsung",
    price: 74990,
    rating: 4.7,
    reviews: 89,
    image: "/images/products/galaxy-s24.jpg",
    inStock: true,
    shortDescription: "ИИ-функции, яркий AMOLED, мощная камера.",
    description:
      "Galaxy S24 создан вокруг искусственного интеллекта: живые переводы, умный поиск и редактирование фото одним касанием. Компактный корпус с флагманской начинкой.",
    specs: {
      Экран: "6,2\" Dynamic AMOLED 2X",
      Процессор: "Snapdragon 8 Gen 3",
      Память: "256 ГБ",
      Камера: "50 Мп + 10 Мп + 12 Мп",
      Аккумулятор: "4000 мА·ч",
    },
  },
  {
    id: "p3",
    name: "Apple Watch Series 9",
    slug: "apple-watch-series-9",
    category: "smart-chasy",
    brand: "Apple",
    price: 39990,
    oldPrice: 44990,
    rating: 4.9,
    reviews: 210,
    image: "/images/products/watch-s9.jpg",
    inStock: true,
    badge: "-11%",
    shortDescription: "Двойной тап, яркий дисплей, точное здоровье.",
    description:
      "Apple Watch Series 9 получили новый жест «двойной тап», более яркий дисплей и чип S9 SiP. Отслеживайте активность, сон и здоровье сердца в привычном формате.",
    specs: {
      Экран: "Retina LTPO OLED",
      Процессор: "S9 SiP",
      Защита: "WR50",
      Автономность: "до 18 часов",
      Корпус: "Алюминий 45 мм",
    },
  },
  {
    id: "p4",
    name: "Sony WH-1000XM5",
    slug: "sony-wh-1000xm5",
    category: "audio",
    brand: "Sony",
    price: 42990,
    rating: 4.8,
    reviews: 156,
    image: "/images/products/sony-xm5.jpg",
    inStock: true,
    badge: "Топ",
    shortDescription: "Лучший шумоподавление и звук премиум-класса.",
    description:
      "WH-1000XM5 задают стандарт беспроводных наушников: два процессора, восемь микрофонов и невероятно чистое звучание. До 30 часов автономной работы.",
    specs: {
      Тип: "Накладные беспроводные",
      Шумоподавление: "Активное",
      Автономность: "до 30 часов",
      Кодеки: "LDAC, SBC, AAC",
      Вес: "250 г",
    },
  },
  {
    id: "p5",
    name: "AirPods Pro 2",
    slug: "airpods-pro-2",
    category: "audio",
    brand: "Apple",
    price: 29990,
    rating: 4.7,
    reviews: 312,
    image: "/images/products/airpods-pro.jpg",
    inStock: true,
    shortDescription: "Адаптивный звук и прозрачность.",
    description:
      "AirPods Pro второго поколения с чипом H2 обеспечивают вдвое более эффективное активное шумоподавление и персонализированный пространственный звук.",
    specs: {
      Тип: "Внутриканальные TWS",
      Чип: "H2",
      "Активное шумоподавление": "Да",
      Автономность: "до 6 часов (до 30 с кейсом)",
      Защита: "IPX4",
    },
  },
  {
    id: "p6",
    name: "Xiaomi Redmi Buds 5 Pro",
    slug: "xiaomi-redmi-buds-5-pro",
    category: "audio",
    brand: "Xiaomi",
    price: 6990,
    oldPrice: 8990,
    rating: 4.5,
    reviews: 74,
    image: "/images/products/redmi-buds.jpg",
    inStock: true,
    badge: "Выгода",
    shortDescription: "Бюджетный флагман с глубоким басом.",
    description:
      "Redmi Buds 5 Pro предлагают флагманское звучание по доступной цене: двухдиапазонные драйверы, активное шумоподавление и стильный дизайн кейса.",
    specs: {
      Тип: "Внутриканальные TWS",
      Драйверы: "двухдиапазонные 11 мм",
      "Активное шумоподавление": "До 52 дБ",
      Автономность: "до 10 часов",
      Кодек: "LDAC",
    },
  },
  {
    id: "p7",
    name: "Samsung Galaxy Watch 6",
    slug: "samsung-galaxy-watch-6",
    category: "smart-chasy",
    brand: "Samsung",
    price: 24990,
    rating: 4.6,
    reviews: 98,
    image: "/images/products/galaxy-watch6.jpg",
    inStock: true,
    shortDescription: "Большой AMOLED-дисплей и анализ сна.",
    description:
      "Galaxy Watch 6 получили увеличенный AMOLED-экран, улучшенный анализ сна и персональные советы по здоровью. Прочный корпус с защитой 5ATM+IP68.",
    specs: {
      Экран: "1,5\" Super AMOLED",
      Процессор: "Exynos W930",
      Датчики: "пульс, SpO2, ЭКГ",
      Автономность: "до 40 часов",
      Защита: "5ATM + IP68",
    },
  },
  {
    id: "p8",
    name: "Anker 737 Power Bank 24 000 mAh",
    slug: "anker-737-power-bank-24000",
    category: "aksessuary",
    brand: "Anker",
    price: 11990,
    rating: 4.8,
    reviews: 45,
    image: "/images/products/anker-powerbank.jpg",
    inStock: true,
    shortDescription: "140 Вт выход, экран, три порта.",
    description:
      "Anker 737 — профессиональный внешний аккумулятор для ноутбуков и гаджетов. TFT-экран показывает мощность, ёмкость и статус каждого порта.",
    specs: {
      Ёмкость: "24 000 мА·ч",
      "Максимальная мощность": "140 Вт",
      Порты: "2×USB-C, 1×USB-A",
      Дисплей: "TFT",
      Вес: "630 г",
    },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.slice(0, 6);
}
