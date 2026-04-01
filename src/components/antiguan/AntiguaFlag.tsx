import { cn } from "@/lib/utils";

interface AntiguaFlagProps {
  width?: number;
  className?: string;
}

const AntiguaFlag = ({ width = 300, className = "" }: AntiguaFlagProps) => {
  const height = width * (2 / 3);
  return (
    <svg
      viewBox="0 0 900 600"
      width={width}
      height={height}
      className={cn(className)}
      aria-label="Flag of Antigua and Barbuda"
      role="img"
    >
      {/* Red field — entire background */}
      <rect width="900" height="600" fill="#CE1126" />

      {/* Inverted V-triangle clipping region */}
      <defs>
        <clipPath id="flagVClip">
          <polygon points="0,0 900,0 450,600" />
        </clipPath>
      </defs>

      {/* Bands inside the V-triangle */}
      <g clipPath="url(#flagVClip)">
        {/* Black band — top */}
        <rect width="900" height="250" fill="#000000" />
        {/* Blue band — middle */}
        <rect y="250" width="900" height="120" fill="#0072C6" />
        {/* White band — bottom */}
        <rect y="370" width="900" height="230" fill="#FFFFFF" />
      </g>

      {/* Golden rising sun — centered on the black band */}
      <g transform="translate(450, 200)">
        {/* Half-sun semicircle body */}
        <path d="M-55,0 A55,55 0 0 1 55,0 Z" fill="#FCD116" />
        {/* Horizon line */}
        <line x1="-80" y1="0" x2="80" y2="0" stroke="#FCD116" strokeWidth="4" />
        {/* 7 triangular rays */}
        <polygon points="0,-90 -8,-30 8,-30" fill="#FCD116" />
        <polygon points="-43,-78 -26,-26 -10,-34" fill="#FCD116" />
        <polygon points="-76,-45 -42,-16 -30,-30" fill="#FCD116" />
        <polygon points="-88,-5 -50,-2 -44,-18" fill="#FCD116" />
        <polygon points="43,-78 26,-26 10,-34" fill="#FCD116" />
        <polygon points="76,-45 42,-16 30,-30" fill="#FCD116" />
        <polygon points="88,-5 50,-2 44,-18" fill="#FCD116" />
      </g>
    </svg>
  );
};

export default AntiguaFlag;
