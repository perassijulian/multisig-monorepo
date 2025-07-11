"use client";

import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  onClick,
  type = "button",
  className,
  disabled = false,
  variant = "primary",
}: ButtonProps) {
  const baseStyles =
    "py-2 px-4 rounded border transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  const variantStyles = disabled
    ? "bg-gray-800 text-textMuted"
    : variant === "primary"
    ? "bg-primary text-white border-border hover:bg-primaryHover"
    : "bg-transparent text-primary border-primary hover:bg-black/50";

  return (
    <button
      onClick={onClick}
      className={cn(baseStyles, variantStyles, className)}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
