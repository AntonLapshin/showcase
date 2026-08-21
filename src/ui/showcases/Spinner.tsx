/**
 * Sample showcase file — Spinner variants.
 *
 * Pure presentational demo: a tiny animated spinner in a few sizes/colors so
 * the gallery canvas has visible content. No business logic lives here.
 */

interface SpinnerProps {
  size?: number;
  colorClass?: string;
}

function Spinner({ size = 16, colorClass = "border-indigo-600" }: SpinnerProps) {
  return (
    <span
      aria-label="Loading"
      className={`inline-block animate-spin rounded-full border-2 border-t-transparent ${colorClass}`}
      style={{ width: size, height: size }}
    />
  );
}

export const name = "Spinner";

export const Small = () => <Spinner size={12} />;

export const Default = () => <Spinner size={20} />;

export const Large = () => <Spinner size={28} colorClass="border-emerald-600" />;
