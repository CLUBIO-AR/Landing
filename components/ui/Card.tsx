import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-card border border-border rounded-card p-6 shadow-card hover:shadow-card-hover transition-shadow duration-200 ${className}`}
    >
      {children}
    </div>
  );
}
