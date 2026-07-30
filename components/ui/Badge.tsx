const VARIANTS = {
  green: "bg-green text-dark",
  lime: "bg-lime text-lime-text",
  gray: "bg-border text-gray-lt",
};

export function Badge({
  children,
  variant = "green",
}: {
  children: React.ReactNode;
  variant?: keyof typeof VARIANTS;
}) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-pill text-xs font-bold tracking-widest uppercase ${VARIANTS[variant]}`}
    >
      {children}
    </span>
  );
}
