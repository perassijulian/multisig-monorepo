"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import Toast from "../UI/Toast";

type ToastType = "success" | "error" | "info";

export interface ShowToastParams {
  message: string;
  type?: ToastType;
}

interface ToastContextType {
  showToast: (params: ShowToastParams) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<ToastType>("info");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const showToast = useCallback(
    ({ message, type = "info" }: ShowToastParams) => {
      setMessage(message);
      setType(type);
      setIsVisible(true);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {isVisible && (
        <Toast
          message={message}
          type={type}
          onClose={() => setIsVisible(false)}
        />
      )}
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ModalProvider");
  return context;
}
