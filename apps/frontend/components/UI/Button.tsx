"use client";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-primary w-full py-2 rounded border border-border hover:bg-primaryHover transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ring"
    >
      {children}
    </button>
  );
}
