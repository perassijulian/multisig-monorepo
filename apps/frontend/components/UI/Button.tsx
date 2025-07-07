"use client";

import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export default function Button({
  children,
  onClick,
  type = "button",
  className,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "bg-primary w-full py-2 rounded border border-border hover:bg-primaryHover transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ring",
        className
      )}
      type={type}
    >
      {children}
    </button>
  );
}
