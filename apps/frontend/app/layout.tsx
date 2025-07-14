"use client";

import "./globals.css";
import { config } from "@/wagmiConfig";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/layout/Navbar";
import ModalProvider from "@/components/context/ModalContext";
import ToastProvider from "@/components/context/ToastContext";
import { MultisigProvider } from "@/components/context/MultisigContext";

const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <ToastProvider>
              <ModalProvider>
                <MultisigProvider>
                  <Navbar />
                  {children}
                </MultisigProvider>
              </ModalProvider>
            </ToastProvider>
          </QueryClientProvider>
        </WagmiProvider>
        <div id="toast-root" />
      </body>
    </html>
  );
}
