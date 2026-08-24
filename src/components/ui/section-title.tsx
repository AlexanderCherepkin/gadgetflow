import { cn } from "@/lib/utils";

export function SectionTitle({
  children,
  subtitle,
  centered = false,
  className,
}: {
  children: React.ReactNode;
  subtitle?: React.ReactNode;
  centered?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("mb-8 md:mb-12", centered && "text-center", className)}>
      <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">
        {children}
      </h2>
      {subtitle && (
        <p className="mt-3 text-text-secondary max-w-2xl text-base md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
