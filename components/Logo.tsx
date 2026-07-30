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
        <circle cx="20" cy="20" r="20" fill="#7C3AED" />
        <path d="M13 12v11a7 7 0 0 0 14 0V12" stroke="#D7FF3D" strokeWidth="5" strokeLinecap="round" fill="none" />
      </svg>
      <span className={`font-bold text-white tracking-tight font-sans ${text}`}>
        CLUB<span className="text-green">IO</span>
      </span>
    </div>
  );
}
