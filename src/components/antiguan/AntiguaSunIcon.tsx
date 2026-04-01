import { cn } from "@/lib/utils";

interface AntiguaSunIconProps {
  size?: number;
  className?: string;
  spinning?: boolean;
  pulsing?: boolean;
}

/**
 * 7-pointed rising sun from the Antigua & Barbuda flag.
 * Golden rays radiating from a semicircle base.
 */
const AntiguaSunIcon = ({ size = 24, className = "", spinning = false, pulsing = false }: AntiguaSunIconProps) => {
  const half = size / 2;
  const rayLength = half * 0.85;

  // 7 rays evenly spread across the top semicircle (180°)
  const rays = Array.from({ length: 7 }, (_, i) => {
    const angle = Math.PI - (i * Math.PI) / 6; // from 180° to 0° in 30° steps
    const x1 = half + Math.cos(angle) * (half * 0.3);
    const y1 = half + Math.sin(angle) * (half * 0.3) * -1;
    const x2 = half + Math.cos(angle) * rayLength;
    const y2 = half + Math.sin(angle) * rayLength * -1;
    return `M${x1},${y1} L${x2},${y2}`;
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      className={cn(
        spinning && "animate-spin-slow",
        pulsing && "animate-pulse-gold",
        className
      )}
      aria-hidden="true"
    >
      {/* Sun body (semicircle) */}
      <path
        d={`M${half * 0.4},${half} A${half * 0.6},${half * 0.6} 0 0 1 ${half * 1.6},${half}`}
        fill="currentColor"
      />
      {/* Rays */}
      {rays.map((d, i) => (
        <path key={i} d={d} stroke="currentColor" strokeWidth={size * 0.06} strokeLinecap="round" />
      ))}
    </svg>
  );
};

export default AntiguaSunIcon;
