import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "GadgetFlow — интернет-магазин электроники и гаджетов",
    template: "%s | GadgetFlow",
  },
  description:
    "Современный интернет-магазин смартфонов, наушников, смарт-часов и аксессуаров. Быстрая доставка, официальная гарантия, удобный сервис.",
  openGraph: {
    title: "GadgetFlow — интернет-магазин электроники и гаджетов",
    description:
      "Современный интернет-магазин смартфонов, наушников, смарт-часов и аксессуаров.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
