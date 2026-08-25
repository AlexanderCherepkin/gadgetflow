import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2 min-h-11 min-w-11 ${className || ""}`}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="GadgetFlow logo"
        className="shrink-0"
      >
        <rect width="32" height="32" rx="8" fill="var(--accent)" />
        <path
          d="M10 21.5C10 21.5 14 10.5 16 10.5C18 10.5 22 21.5 22 21.5"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="16" cy="15" r="2.5" fill="white" />
        <path
          d="M8 24C8 24 11 20 16 20C21 20 24 24 24 24"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-xl font-semibold tracking-tight text-foreground">
        GadgetFlow
      </span>
    </Link>
  );
}
