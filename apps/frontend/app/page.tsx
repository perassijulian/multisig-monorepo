import ConnectWalletButton from "@/components/ConnectWalletButton";
import ThemeToggleButton from "@/components/ThemeToggleButton";

export default function Home() {
  return (
    <main>
      <ThemeToggleButton />
      <ConnectWalletButton />
      <ConnectWalletButton />
    </main>
  );
}
