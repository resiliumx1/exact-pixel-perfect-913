import { cn } from "@/lib/utils";
import AntiguaSunIcon from "./AntiguaSunIcon";

interface SectionDividerSunProps {
  className?: string;
}

/**
 * Horizontal line with a centered sun icon — replaces plain `<hr>` dividers.
 */
const SectionDividerSun = ({ className = "" }: SectionDividerSunProps) => (
  <div className={cn("flex items-center gap-3 justify-center", className)}>
    <div className="h-px w-10 bg-antigua-gold/40" />
    <AntiguaSunIcon size={20} className="text-antigua-gold" />
    <div className="h-px w-10 bg-antigua-gold/40" />
  </div>
);

export default SectionDividerSun;
