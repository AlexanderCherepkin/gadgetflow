import { Country } from "./index";

export const countries: Country[] = [
  { code: "BY", name: "Беларусь", phonePrefix: "+375" },
  { code: "RU", name: "Россия", phonePrefix: "+7" },
  { code: "KZ", name: "Казахстан", phonePrefix: "+7" },
  { code: "AM", name: "Армения", phonePrefix: "+374" },
  { code: "KG", name: "Кыргызстан", phonePrefix: "+996" },
];

export interface DeliverySubZone {
  name: string;
  costBYN: number;
  days: string;
}

export interface EaeuDeliveryZone {
  countryCode: string;
  countryName: string;
  currency: "BYN" | "RUB" | "KZT" | "AMD" | "KGS";
  phonePrefix: string;
  zones: DeliverySubZone[];
}

export const eaeuDeliveryZones: EaeuDeliveryZone[] = [
  {
    countryCode: "BY",
    countryName: "Беларусь",
    currency: "BYN",
    phonePrefix: "+375",
    zones: [
      { name: "Минск — курьер", costBYN: 0, days: "1–2 дня" },
      { name: "Минск — ПВЗ / Белпочта", costBYN: 0, days: "1–3 дня" },
      { name: "Областные центры", costBYN: 490, days: "2–4 дня" },
      { name: "Другие населённые пункты", costBYN: 690, days: "3–6 дней" },
    ],
  },
  {
    countryCode: "RU",
    countryName: "Россия",
    currency: "RUB",
    phonePrefix: "+7",
    zones: [
      { name: "Москва и Санкт-Петербург — СДЭК / Boxberry", costBYN: 490, days: "2–4 дня" },
      { name: "Регионы Центральной России — СДЭК / Boxberry", costBYN: 790, days: "3–6 дней" },
      { name: "Дальние регионы и Сибирь — СДЭК / Boxberry", costBYN: 1190, days: "5–10 дней" },
    ],
  },
  {
    countryCode: "KZ",
    countryName: "Казахстан",
    currency: "KZT",
    phonePrefix: "+7",
    zones: [
      { name: "Алматы / Астана — Kazpost / курьер", costBYN: 590, days: "3–5 дней" },
      { name: "Крупные города — Kazpost / ПВЗ", costBYN: 890, days: "4–7 дней" },
      { name: "Другие населённые пункты", costBYN: 1190, days: "5–12 дней" },
    ],
  },
  {
    countryCode: "AM",
    countryName: "Армения",
    currency: "AMD",
    phonePrefix: "+374",
    zones: [
      { name: "Ереван — HayPost / курьер", costBYN: 690, days: "3–5 дней" },
      { name: "Другие населённые пункты — HayPost", costBYN: 990, days: "4–8 дней" },
    ],
  },
  {
    countryCode: "KG",
    countryName: "Кыргызстан",
    currency: "KGS",
    phonePrefix: "+996",
    zones: [
      { name: "Бишкек — курьер / Kyrgyz Post", costBYN: 690, days: "3–5 дней" },
      { name: "Другие населённые пункты — Kyrgyz Post", costBYN: 990, days: "4–9 дней" },
    ],
  },
];

export function getDeliveryZones(countryCode: string): EaeuDeliveryZone | undefined {
  return eaeuDeliveryZones.find((zone: EaeuDeliveryZone) => zone.countryCode === countryCode);
}
