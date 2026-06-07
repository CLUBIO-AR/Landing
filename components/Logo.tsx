const sizes = {
  sm: { wrapper: "h-7", text: "text-[18px]" },
  md: { wrapper: "h-9", text: "text-[22px]" },
  lg: { wrapper: "h-12", text: "text-[28px]" },
};

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const { wrapper, text } = sizes[size];

  return (
    <div className={`flex items-center gap-2.5 ${wrapper}`}>
      <svg viewBox="0 0 40 40" className="h-full w-auto" fill="none" aria-hidden="true">
        <polygon points="20,2 35,10 35,30 20,38 5,30 5,10" fill="#22C55E" />
        <polygon points="20,6 32,13 32,27 20,34 8,27 8,13" fill="#16A34A" />
        <path d="M22 8L13 21H20L18 32L27 19H20L22 8Z" fill="white" />
      </svg>
      <span className={`font-bold text-white tracking-tight font-sans ${text}`}>
        CLUB<span className="text-green">IO</span>
      </span>
    </div>
  );
}
