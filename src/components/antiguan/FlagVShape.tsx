import { cn } from "@/lib/utils";

interface FlagVShapeProps {
  className?: string;
  variant?: "gradient" | "outline";
  opacity?: number;
}

/**
 * Inverted V-shape from the Antigua flag — used as decorative watermarks/overlays.
 * Rendered absolute with pointer-events-none.
 */
const FlagVShape = ({ className = "", variant = "outline", opacity = 0.05 }: FlagVShapeProps) => (
  <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)} style={{ opacity }}>
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
      {variant === "gradient" ? (
        <>
          <defs>
            <linearGradient id="vgrad" x1="0.5" y1="0" x2="0.5" y2="1">
              <stop offset="0%" stopColor="hsl(48, 97%, 54%)" />
              <stop offset="50%" stopColor="hsl(352, 90%, 44%)" />
              <stop offset="100%" stopColor="hsl(0, 0%, 4%)" />
            </linearGradient>
          </defs>
          <path d="M0 0 L50 100 L100 0 Z" fill="url(#vgrad)" />
        </>
      ) : (
        <path d="M0 0 L50 100 L100 0" fill="none" stroke="currentColor" strokeWidth="2" />
      )}
    </svg>
  </div>
);

export default FlagVShape;
