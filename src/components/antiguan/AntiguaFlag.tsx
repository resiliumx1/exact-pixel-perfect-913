import { cn } from "@/lib/utils";

interface AntiguaFlagProps {
  width?: number;
  className?: string;
}

/**
 * Full SVG recreation of the Antigua & Barbuda flag — no raster image.
 */
const AntiguaFlag = ({ width = 300, className = "" }: AntiguaFlagProps) => {
  const height = width * (2 / 3);
  return (
    <svg
      viewBox="0 0 450 300"
      width={width}
      height={height}
      className={cn(className)}
      aria-label="Flag of Antigua and Barbuda"
      role="img"
    >
      {/* Black background */}
      <rect width="450" height="300" fill="#0A0A0A" />
      {/* Red triangles (left and right) */}
      <polygon points="0,0 225,300 0,300" fill="#CE1126" />
      <polygon points="450,0 225,300 450,300" fill="#CE1126" />
      {/* Blue top section */}
      <polygon points="0,0 450,0 225,200" fill="#0072C6" />
      {/* White V-shape bands */}
      <polygon points="0,0 30,0 225,175 420,0 450,0 225,200" fill="#FFFFFF" />
      {/* Golden rising sun */}
      <g transform="translate(225,140)">
        {/* Sun body */}
        <path d="M-40,0 A40,40 0 0 1 40,0" fill="#FCD116" />
        {/* 7 rays */}
        {Array.from({ length: 7 }, (_, i) => {
          const angle = Math.PI - (i * Math.PI) / 6;
          const x = Math.cos(angle) * 70;
          const y = -Math.sin(angle) * 70;
          return <line key={i} x1={Math.cos(angle) * 15} y1={-Math.sin(angle) * 15} x2={x} y2={y} stroke="#FCD116" strokeWidth="6" strokeLinecap="round" />;
        })}
      </g>
    </svg>
  );
};

export default AntiguaFlag;
