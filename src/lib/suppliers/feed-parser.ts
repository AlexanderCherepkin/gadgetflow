import { XMLParser } from "fast-xml-parser";

export interface ParsedProduct {
  externalId: string;
  name: string;
  brand?: string;
  category?: string;
  description?: string;
  shortDescription?: string;
  price: number;
  oldPrice?: number;
  currency: string;
  available: boolean;
  stock?: number;
  image?: string;
  images: string[];
  params: Record<string, string>;
  barcode?: string;
  vendorCode?: string;
  countryOfOrigin?: string;
  warranty?: string;
  url?: string;
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
  parseAttributeValue: false,
  trimValues: true,
});

function safeText(value: unknown): string | undefined {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value);
  return undefined;
}

function safeNumber(value: unknown): number | undefined {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = parseFloat(value.replace(/\s/g, "").replace(",", "."));
    return isNaN(parsed) ? undefined : parsed;
  }
  return undefined;
}

function safeBoolean(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    return value === "true" || value === "1" || value === "да" || value === "yes";
  }
  return true;
}

export function parseYmlFeed(xmlContent: string): ParsedProduct[] {
  const parsed = parser.parse(xmlContent);
  const catalog = parsed?.yml_catalog || parsed;
  const offers = catalog?.shop?.offers?.offer || [];
  const offersArray = Array.isArray(offers) ? offers : offers ? [offers] : [];

  return offersArray.map((offer: Record<string, unknown>): ParsedProduct => {
    const attributes = (offer["@_"] || {}) as Record<string, string>;
    const id = String(attributes.id || offer["@_id"] || "unknown");

    const params: Record<string, string> = {};
    const paramList = offer.param || [];
    const paramArray = Array.isArray(paramList) ? paramList : paramList ? [paramList] : [];
    paramArray.forEach((param: Record<string, unknown>) => {
      const name = safeText(param["@_name"] || param.name);
      const value = safeText(param["#text"] || param.value || param);
      if (name && value) {
        params[name] = value;
      }
    });

    const pictures = offer.picture || [];
    const images = Array.isArray(pictures)
      ? pictures.map((p: unknown) => safeText(p) || "").filter(Boolean)
      : pictures
      ? [safeText(pictures) || ""].filter(Boolean)
      : [];

    return {
      externalId: id,
      name: safeText(offer.name) || "Без названия",
      brand: safeText(offer.vendor || offer.brand),
      category: safeText(offer.categoryId || offer.category || offer.typePrefix),
      description: safeText(offer.description),
      shortDescription: undefined,
      price: safeNumber(offer.price) || 0,
      oldPrice: safeNumber(offer.oldprice || offer.oldPrice),
      currency: safeText(offer.currencyId) || "BYN",
      available: safeBoolean(attributes.available ?? offer.available),
      stock: safeNumber(offer.stock || offer.quantity || offer["@_stock"]),
      image: images[0],
      images,
      params,
      barcode: safeText(offer.barcode || offer.ean),
      vendorCode: safeText(offer.vendorCode || offer.model || offer.article),
      countryOfOrigin: safeText(offer.country_of_origin || offer.countryOfOrigin),
      warranty: safeText(offer.warranty),
      url: safeText(offer.url),
    };
  });
}

export function parseGenericXmlFeed(xmlContent: string): ParsedProduct[] {
  const parsed = parser.parse(xmlContent);
  // Heuristic: look for items/products/offers in common XML formats
  const root = parsed;
  let candidates: unknown[] = [];

  const findArray = (obj: Record<string, unknown>, keys: string[]): unknown[] => {
    for (const key of keys) {
      const value = obj[key];
      if (Array.isArray(value)) return value;
      if (value && typeof value === "object") return [value];
    }
    return [];
  };

  if (root.products) candidates = findArray(root, ["products", "product"]);
  else if (root.items) candidates = findArray(root, ["items", "item"]);
  else if (root.offers) candidates = findArray(root, ["offers", "offer"]);
  else if (root.shop && typeof root.shop === "object") {
    const shop = root.shop as Record<string, unknown>;
    candidates = findArray(shop, ["offers", "offer", "products", "product"]);
  }

  return candidates.map((item: unknown): ParsedProduct => {
    const it = item as Record<string, unknown>;
    const id = String(it.id || it["@_id"] || it.externalId || it.sku || "unknown");
    const images: string[] = [];
    if (it.image) images.push(safeText(it.image) || "");
    if (it.images && Array.isArray(it.images)) {
      const imgs = it.images as unknown[];
      imgs.forEach((img) => {
        if (typeof img === "string") images.push(img);
        else if (typeof img === "object" && img && "url" in img) {
          images.push(String(img.url));
        }
      });
    }

    return {
      externalId: id,
      name: safeText(it.name || it.title) || "Без названия",
      brand: safeText(it.brand || it.vendor || it.manufacturer),
      category: safeText(it.category || it.categoryId),
      description: safeText(it.description || it.desc),
      shortDescription: safeText(it.shortDescription || it.short_description),
      price: safeNumber(it.price) || 0,
      oldPrice: safeNumber(it.oldPrice || it.oldprice || it.old_price),
      currency: safeText(it.currency || it.currencyId) || "BYN",
      available: safeBoolean(it.available ?? it.inStock ?? it.is_available ?? true),
      stock: safeNumber(it.stock || it.quantity || it.amount),
      image: images[0],
      images: images.filter(Boolean),
      params: (it.params as Record<string, string>) || {},
      barcode: safeText(it.barcode || it.ean || it.upc),
      vendorCode: safeText(it.vendorCode || it.sku || it.model),
      countryOfOrigin: safeText(it.countryOfOrigin || it.country_of_origin),
      warranty: safeText(it.warranty),
      url: safeText(it.url || it.link),
    };
  });
}

export function parseSupplierFeed(
  xmlContent: string,
  format: "yml" | "xml" = "yml"
): ParsedProduct[] {
  if (format === "yml") return parseYmlFeed(xmlContent);
  return parseGenericXmlFeed(xmlContent);
}
