import Link from "next/link";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-3 min-h-16 min-w-32 ${className || ""}`}
    >
      <Image
        src="/logo-gadgetflow.png"
        alt="GadgetFlow logo"
        width={128}
        height={64}
        className="shrink-0 rounded-xl w-32 h-16 object-contain"
        priority
      />
      <span className="text-xl font-semibold tracking-tight text-foreground">
        GadgetFlow
      </span>
    </Link>
  );
}
