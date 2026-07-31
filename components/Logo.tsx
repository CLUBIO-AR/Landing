import Image from "next/image";

const sizes = {
  sm: { wrapper: "h-7", text: "text-[18px]" },
  md: { wrapper: "h-9", text: "text-[22px]" },
  lg: { wrapper: "h-12", text: "text-[28px]" },
};

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const { wrapper, text } = sizes[size];

  return (
    <div className={`flex items-center gap-2.5 ${wrapper}`}>
      <Image src="/icon.png" alt="" width={40} height={40} className="h-full w-auto rounded-[22%]" aria-hidden="true" />
      <span className={`logo-wordmark text-white tracking-tight ${text}`}>
        CLUB<span className="text-green">IO</span>
      </span>
    </div>
  );
}
