import ConnectWalletButton from "../UI/ConnectWalletButton";
import ThemeToggleButton from "../UI/ThemeToggleButton";

export default function Navbar() {
  return (
    <nav className="w-full h-12 bg-bgSubtle border-b border-border flex items-center justify-between px-4 py-6">
      <div>MULTISIG</div>
      <div className="flex gap-2">
        <ConnectWalletButton />
        <ThemeToggleButton />
      </div>
    </nav>
  );
}
