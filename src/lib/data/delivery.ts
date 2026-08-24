import { DeliveryZone, Country } from "./index";

export const countries: Country[] = [
  { code: "RU", name: "Россия", phonePrefix: "+7" },
  { code: "KZ", name: "Казахстан", phonePrefix: "+7" },
  { code: "BY", name: "Беларусь", phonePrefix: "+375" },
  { code: "AM", name: "Армения", phonePrefix: "+374" },
  { code: "AZ", name: "Азербайджан", phonePrefix: "+994" },
  { code: "GE", name: "Грузия", phonePrefix: "+995" },
  { code: "RS", name: "Сербия", phonePrefix: "+381" },
  { code: "HR", name: "Хорватия", phonePrefix: "+385" },
  { code: "BG", name: "Болгария", phonePrefix: "+359" },
];

export const deliveryZones: DeliveryZone[] = [
  {
    countryCode: "RU",
    countryName: "Россия",
    zones: [
      { name: "Москва и Санкт-Петербург", cost: 0, days: "1–2 дня" },
      { name: "Центральный федеральный округ", cost: 390, days: "2–4 дня" },
      { name: "Остальные регионы", cost: 590, days: "3–7 дней" },
    ],
  },
  {
    countryCode: "KZ",
    countryName: "Казахстан",
    zones: [
      { name: "Алматы / Астана", cost: 1290, days: "3–5 дней" },
      { name: "Другие города", cost: 1690, days: "5–9 дней" },
    ],
  },
  {
    countryCode: "BY",
    countryName: "Беларусь",
    zones: [
      { name: "Минск", cost: 790, days: "2–3 дня" },
      { name: "Областные центры", cost: 990, days: "3–5 дней" },
    ],
  },
  {
    countryCode: "AM",
    countryName: "Армения",
    zones: [
      { name: "Ереван", cost: 1490, days: "4–6 дней" },
      { name: "Другие города", cost: 1890, days: "6–10 дней" },
    ],
  },
  {
    countryCode: "AZ",
    countryName: "Азербайджан",
    zones: [
      { name: "Баку", cost: 1490, days: "4–6 дней" },
      { name: "Другие города", cost: 1890, days: "6–10 дней" },
    ],
  },
  {
    countryCode: "GE",
    countryName: "Грузия",
    zones: [
      { name: "Тбилиси", cost: 1490, days: "4–6 дней" },
      { name: "Другие города", cost: 1890, days: "6–10 дней" },
    ],
  },
  {
    countryCode: "RS",
    countryName: "Сербия",
    zones: [
      { name: "Белград", cost: 1990, days: "5–8 дней" },
      { name: "Другие города", cost: 2390, days: "7–12 дней" },
    ],
  },
  {
    countryCode: "HR",
    countryName: "Хорватия",
    zones: [
      { name: "Загреб", cost: 1990, days: "5–8 дней" },
      { name: "Другие города", cost: 2390, days: "7–12 дней" },
    ],
  },
  {
    countryCode: "BG",
    countryName: "Болгария",
    zones: [
      { name: "София", cost: 1990, days: "5–8 дней" },
      { name: "Другие города", cost: 2390, days: "7–12 дней" },
    ],
  },
];

export function getDeliveryZones(countryCode: string): DeliveryZone | undefined {
  return deliveryZones.find((z) => z.countryCode === countryCode);
}
