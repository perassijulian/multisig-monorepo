import ConnectWalletButton from "@/components/ConnectWalletButton";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <ThemeToggleButton />
      <ConnectWalletButton />
      <ConnectWalletButton />
    </main>
  );
}
