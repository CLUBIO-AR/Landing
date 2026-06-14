import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-green text-dark hover:bg-green-dk shadow-green-glow hover:shadow-none",
  outline: "border border-green text-green hover:bg-green hover:text-dark",
  ghost: "text-gray hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsButton = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsAnchor = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 font-semibold rounded-btn transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props as ButtonAsAnchor;
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
