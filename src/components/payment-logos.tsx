import Image from "next/image";

const methods = [
  { name: "Visa", src: "/images/payment/visa.svg", width: 100, imageClassName: "p-2" },
  { name: "Mastercard", src: "/images/payment/mastercard.svg", width: 100, imageClassName: "p-2.5" },
  { name: "БЕЛКАРТ", src: "/images/payment/belkart.svg", width: 100, imageClassName: "p-2" },
  { name: "ЕРИП", src: "/images/payment/erip.svg", width: 100 },
  { name: "МИР", src: "/images/payment/mir.svg", width: 100 },
  { name: "СБП", src: "/images/payment/sbp-full.svg", width: 100, imageClassName: "p-3.5" },
  { name: "СберБанк", src: "/images/payment/sber.svg", width: 100, imageClassName: "p-3.5" },
  { name: "Т-Банк", src: "/images/payment/t-bank.svg", width: 100, imageClassName: "p-2" },
  { name: "Kaspi Pay", src: "/images/payment/kaspi.svg", width: 100, imageClassName: "p-2" },
  { name: "Halyk Bank", src: "/images/payment/halyk.svg", width: 100, imageClassName: "p-2" },
];

export function PaymentLogos({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`} aria-label="Доступные способы оплаты">
      {methods.map((method) => (
        <div
          key={method.name}
          className="group relative h-12 rounded-xl bg-white border border-border shadow-sm overflow-hidden flex items-center justify-center cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.15),0_4px_10px_-2px_rgba(0,0,0,0.1)] hover:scale-[1.03] active:scale-95 active:translate-y-0"
          style={{ width: method.width }}
        >
          <Image
            src={method.src}
            alt={method.name}
            fill
            className={`object-contain ${method.imageClassName ?? "p-1.5"}`}
            sizes="(max-width: 768px) 20vw, 120px"
          />
        </div>
      ))}
    </div>
  );
}
