"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Info, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  onClose?: () => void;
  duration?: number; // ms
}

const toastResources = {
  success: {
    border: "border-green-500",
    background: "bg-green-100 dark:bg-green-900",
    text: "text-green-800 dark:text-green-200",
    icon: <CheckCircle className="w-7 h-7" />,
  },
  error: {
    border: "border-red-500",
    background: "bg-red-100 dark:bg-red-900",
    text: "text-red-800 dark:text-red-200",
    icon: <XCircle className="w-7 h-7" />,
  },
  info: {
    border: "border-blue-500",
    background: "bg-blue-100 dark:bg-blue-900",
    text: "text-blue-800 dark:text-blue-200",
    icon: <Info className="w-7 h-7" />,
  },
};

export default function Toast({
  message,
  type = "info",
  onClose,
  duration = 4000,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Trigger entrance animation
    const enterTimeout = setTimeout(() => setIsVisible(true), 10);
    const exitTimeout = setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        setTimeout(onClose, 300); // wait for animation to finish
      }
    }, duration);

    return () => {
      clearTimeout(enterTimeout);
      clearTimeout(exitTimeout);
    };
  }, [duration, onClose]);

  const { border, background, text, icon } = toastResources[type];

  const toast = (
    <div className="fixed inset-x-0 top-6 z-[9999] flex justify-center pointer-events-none w-full">
      <div
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className={cn(
          border,
          background,
          text,
          "flex items-center gap-4 max-w-md w-full pointer-events-auto border border text-sm font-medium",
          "backdrop-blur-md rounded-2xl mx-6 px-4 py-3 shadow-xl transition-all duration-300 transform",
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 -translate-y-4"
        )}
      >
        <div className="bg-white/50 p-2 rounded-full">{icon}</div>
        <p className="font-medium">{message}</p>
      </div>
    </div>
  );

  if (typeof window === "undefined") return null;

  const toastRoot = document.getElementById("toast-root");
  if (!toastRoot) return null;

  return createPortal(toast, toastRoot);
}
