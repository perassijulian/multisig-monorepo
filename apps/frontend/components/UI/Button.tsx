"use client";

import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  type = "button",
  className,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full py-2 rounded border border-border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ring",
        className,
        disabled
          ? "bg-gray-800 text-textMuted"
          : "bg-primary hover:bg-primaryHover"
      )}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
