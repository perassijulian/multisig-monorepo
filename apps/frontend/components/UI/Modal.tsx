import { X } from "lucide-react";
import { ReactNode, useEffect } from "react";
import clsx from "clsx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  title?: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  className,
  title = "",
}: ModalProps) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="bg-black/70 backdrop-blur-sm fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={clsx(
          "relative bg-bg border border-border rounded shadow-xl p-6 w-full max-w-md animate-fadeIn space-y-4",
          className
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text">{title}</h2>
          <button
            onClick={onClose}
            className="text-foreground hover:text-foreground-secondary transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
