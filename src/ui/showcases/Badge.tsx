/**
 * Sample showcase file — Badge variants.
 *
 * Pure presentational demo: a small pill badge in a few tones. No business
 * logic lives here.
 */

interface BadgeProps {
  label: string;
  tone?: "slate" | "emerald" | "amber" | "indigo";
}

const toneClasses: Record<NonNullable<BadgeProps["tone"]>, string> = {
  slate: "bg-slate-100 text-slate-700",
  emerald: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  indigo: "bg-indigo-100 text-indigo-700",
};

function Badge({ label, tone = "indigo" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${toneClasses[tone]}`}
    >
      {label}
    </span>
  );
}

export const name = "Badge";

export const Neutral = () => <Badge label="Neutral" tone="slate" />;

export const Success = () => <Badge label="Success" tone="emerald" />;

export const Warning = () => <Badge label="Warning" tone="amber" />;

export const Accent = () => <Badge label="Accent" tone="indigo" />;
