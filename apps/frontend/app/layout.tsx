"use client";

import "./globals.css";
import { config } from "@/wagmiConfig";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppShell from "@/components/layout/AppShell";

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
            <AppShell>{children}</AppShell>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
