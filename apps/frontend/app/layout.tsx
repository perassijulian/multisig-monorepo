"use client";

import "./globals.css";
import { config } from "@/wagmiConfig";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/layout/Navbar";
import ModalProvider from "@/components/context/ModalContext";

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
            <ModalProvider>
              <Navbar />
              {children}
            </ModalProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
