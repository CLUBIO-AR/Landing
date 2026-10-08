import type { ReactNode } from "react";

export function SectionHeading({
  title,
  subtitle,
  align = "left",
  inverted = false,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  inverted?: boolean;
}) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-4 max-w-2xl ${alignment}`}>
      <h2 className="text-4xl md:text-5xl font-display leading-tight">{title}</h2>
      {subtitle && (
        <p className={`text-lg md:text-xl leading-relaxed ${inverted ? "text-on-ink/70" : "text-gray-lt"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
