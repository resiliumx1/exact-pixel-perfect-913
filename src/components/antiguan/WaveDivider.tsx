import { cn } from "@/lib/utils";

interface WaveDividerProps {
  className?: string;
  fill?: string;
  flip?: boolean;
}

/**
 * Organic SVG wave divider for section transitions.
 */
const WaveDivider = ({ className = "", fill = "hsl(0 0% 4%)", flip = false }: WaveDividerProps) => (
  <div className={cn("w-full overflow-hidden leading-[0]", flip && "rotate-180", className)}>
    <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[60px] lg:h-[80px]">
      <path
        d="M0,60 C180,120 360,0 540,60 C720,120 900,20 1080,60 C1200,85 1320,40 1440,60 L1440,120 L0,120 Z"
        fill={fill}
      />
    </svg>
  </div>
);

export default WaveDivider;
