import { cn } from "@/lib/utils";

interface AntiguaFlagSmallProps {
  width?: number;
  className?: string;
}

const AntiguaFlagSmall = ({ width = 28, className = "" }: AntiguaFlagSmallProps) => {
  const height = width * (2 / 3);
  return (
    <svg
      viewBox="0 0 90 60"
      width={width}
      height={height}
      className={cn("rounded-[2px]", className)}
      style={{ border: '0.5px solid rgba(255,255,255,0.25)' }}
      aria-label="Antigua flag"
      role="img"
    >
      <rect width="90" height="60" fill="#CE1126" />
      <defs>
        <clipPath id="smallVClip">
          <polygon points="0,0 90,0 45,60" />
        </clipPath>
      </defs>
      <g clipPath="url(#smallVClip)">
        <rect width="90" height="25" fill="#000000" />
        <rect y="25" width="90" height="12" fill="#0072C6" />
        <rect y="37" width="90" height="23" fill="#FFFFFF" />
      </g>
      <g transform="translate(45, 20)">
        <path d="M-6,0 A6,6 0 0 1 6,0 Z" fill="#FCD116" />
        <polygon points="0,-12 -1,-4 1,-4" fill="#FCD116" />
        <polygon points="-6,-10 -3,-3 -1,-5" fill="#FCD116" />
        <polygon points="-11,-5 -6,-1 -5,-3" fill="#FCD116" />
        <polygon points="6,-10 3,-3 1,-5" fill="#FCD116" />
        <polygon points="11,-5 6,-1 5,-3" fill="#FCD116" />
        <polygon points="-12,0 -6,0 -5,-2" fill="#FCD116" />
        <polygon points="12,0 6,0 5,-2" fill="#FCD116" />
      </g>
    </svg>
  );
};

export default AntiguaFlagSmall;
