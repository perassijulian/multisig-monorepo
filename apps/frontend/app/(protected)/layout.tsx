"use client";

import { MultisigProvider } from "@/components/context/MultisigContext";
import AppShell from "@/components/layout/AppShell";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MultisigProvider>
      <AppShell>{children}</AppShell>
    </MultisigProvider>
  );
}
