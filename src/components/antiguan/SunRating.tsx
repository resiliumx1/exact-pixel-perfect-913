import AntiguaSunIcon from "./AntiguaSunIcon";

interface SunRatingProps {
  value: number;
  max?: number;
  size?: number;
}

/**
 * Sun-based rating system — gold filled suns replace star icons.
 */
const SunRating = ({ value, max = 5, size = 16 }: SunRatingProps) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: max }, (_, i) => (
      <AntiguaSunIcon
        key={i}
        size={size}
        className={i < value ? "text-antigua-gold" : "text-antigua-gold/20"}
      />
    ))}
  </div>
);

export default SunRating;
