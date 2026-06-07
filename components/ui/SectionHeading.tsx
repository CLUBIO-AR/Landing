import type { ReactNode } from "react";
import { Badge } from "./Badge";

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = "left",
}: {
  badge: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
}) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-4 max-w-2xl ${alignment}`}>
      <Badge>{badge}</Badge>
      <div className="w-16 h-1 bg-green rounded-full" />
      <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">{title}</h2>
      {subtitle && (
        <p className="text-base md:text-lg text-gray leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
