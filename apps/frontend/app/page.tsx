import AppShell from "@/components/layout/AppShell";
import ConnectWalletButton from "@/components/UI/ConnectWalletButton";
import ThemeToggleButton from "@/components/UI/ThemeToggleButton";

export default function Home() {
  return (
    <main>
      <AppShell>
        <ThemeToggleButton />
      </AppShell>
    </main>
  );
}
