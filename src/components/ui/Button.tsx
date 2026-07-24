"use client";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
}: ButtonProps) {
  const baseStyles =
    "font-display font-semibold tracking-wide transition-all duration-200 border-none cursor-pointer";

  const variants = {
    primary: "bg-[#0057FF] text-cream hover:shadow-[0_0_30px_rgba(0,87,255,0.4)]",
    secondary: "bg-cream/[0.06] text-cream hover:bg-cream/[0.10]",
    ghost:
      "bg-transparent text-signal-blue border border-signal-blue/40 hover:bg-signal-blue hover:text-cream",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}