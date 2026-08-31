"use client";

import Image from "next/image";
import { cn, type CurrencyCode } from "@/lib/utils";

interface PriceProps {
  value: number;
  currency?: CurrencyCode;
  className?: string;
  iconClassName?: string;
  showDecimals?: boolean;
}

function formatPriceNumber(value: number, showDecimals: boolean): string {
  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(value);
}

export function Price({
  value,
  currency = "BYN",
  className,
  iconClassName,
  showDecimals = currency === "BYN",
}: PriceProps) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      <span>{formatPriceNumber(value, showDecimals)}</span>
      {currency === "BYN" ? (
        <Image
          src="/images/hero/byn.png"
          alt="BYN"
          width={16}
          height={16}
          className={cn("inline-block object-contain", iconClassName)}
        />
      ) : (
        <span className="text-current">{currency}</span>
      )}
    </span>
  );
}
