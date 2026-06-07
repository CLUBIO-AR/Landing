export function Badge({
  children,
  variant = "green",
}: {
  children: React.ReactNode;
  variant?: "green" | "gray";
}) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-pill text-xs font-bold tracking-widest uppercase ${
        variant === "green" ? "bg-green text-dark" : "bg-border text-gray-lt"
      }`}
    >
      {children}
    </span>
  );
}
