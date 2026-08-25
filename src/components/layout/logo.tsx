import Link from "next/link";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2 min-h-11 min-w-11 ${className || ""}`}
    >
      <Image
        src="/logo-gadgetflow.png"
        alt="GadgetFlow logo"
        width={32}
        height={32}
        className="shrink-0 rounded-lg"
        priority
      />
      <span className="text-xl font-semibold tracking-tight text-foreground">
        GadgetFlow
      </span>
    </Link>
  );
}
