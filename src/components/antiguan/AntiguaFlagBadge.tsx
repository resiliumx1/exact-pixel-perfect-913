import { cn } from "@/lib/utils";

interface AntiguaFlagBadgeProps {
  className?: string;
  variant?: "compact" | "full";
}

/**
 * "Proudly Antiguan 🇦🇬" pill badge.
 */
const AntiguaFlagBadge = ({ className = "", variant = "compact" }: AntiguaFlagBadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 font-body font-semibold rounded-full border border-antigua-gold/30 bg-antigua-gold/10",
      variant === "compact" ? "text-[11px] px-3 py-1" : "text-xs px-4 py-1.5",
      className
    )}
  >
    <span>🇦🇬</span>
    <span className="text-antigua-gold">{variant === "full" ? "Proudly Antiguan" : "Antigua"}</span>
  </span>
);

export default AntiguaFlagBadge;
