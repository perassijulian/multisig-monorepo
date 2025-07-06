import ConnectWalletButton from "@/components/ConnectWalletButton";
import ThemeToggleButton from "@/components/ThemeToggleButton";

export default function Home() {
  return (
    <main>
      <ConnectWalletButton />
      <div className="text-foreground">not working</div>
      <div style={{ color: "var(--color-foreground)" }}>working</div>
      <div className="text-debugtest">
        If this is light blue, Tailwind config is being picked up
      </div>
      <div className="test-tailwind">Tailwind is loaded?</div>
      <ThemeToggleButton />
    </main>
  );
}
