export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export interface NavCategory {
  name: string;
  slug: string;
}

export interface ProductVariant {
  label: string;
  value: string;
}

export interface ProductSpecs {
  [key: string]: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  inStock: boolean;
  badge?: string;
  shortDescription: string;
  description: string;
  specs: ProductSpecs;
  variants?: ProductVariant[];
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  text: string;
  date: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  date: string;
  excerpt: string;
}

export interface DeliverySubZone {
  name: string;
  cost: number;
  days: string;
}

export interface DeliveryZone {
  countryCode: string;
  countryName: string;
  zones: DeliverySubZone[];
}

export interface Country {
  code: string;
  name: string;
  phonePrefix: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
