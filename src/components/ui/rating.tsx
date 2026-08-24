import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({
  value,
  count,
  size = "sm",
}: {
  value: number;
  count?: number;
  size?: "sm" | "md";
}) {
  const sizeClass = size === "md" ? "h-5 w-5" : "h-3.5 w-3.5";
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < Math.round(value);
          return (
            <Star
              key={i}
              className={cn(
                sizeClass,
                filled ? "fill-warning text-warning" : "text-border"
              )}
            />
          );
        })}
      </div>
      {count !== undefined && (
        <span className="text-xs text-text-muted">({count})</span>
      )}
    </div>
  );
}
