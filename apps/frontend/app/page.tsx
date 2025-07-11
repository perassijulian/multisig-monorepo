import ConnectWalletButton from "@/components/UI/ConnectWalletButton";
import { Box } from "lucide-react";

export default function Home() {
  return (
    <main className="flex p-4 gap-4 h-[calc(100dvh-64px)]">
      <div className="w-full rounded-xl px-10 py-14 bg-[length:400%_400%] animate-aurora bg-[linear-gradient(-45deg,#0f172a,#22d3ee,#8b5cf6,#0f172a)] relative overflow-hidden">
        <div className="text-black">
          <h1 className="text-5xl font-bold">Multisig Wallet</h1>
          <p className="mt-5 text-2xl">
            A project to show what's possible with nowadays technology
          </p>
          <ul className="mt-20 space-y-4 text-xl">
            <li className="flex gap-2 items-center">
              <Box size={18} />
              Secure, programmable transaction execution
            </li>
            <li className="flex gap-2 items-center">
              <Box size={18} />
              Multisig for collective decision-making
            </li>
            <li className="flex gap-2 items-center">
              <Box size={18} />
              Built on open protocols
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full rounded-xl p-10 bg-bgSubtle shadow-xl flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-semibold text-[--color-text]">
          Get Started
        </h2>
        <p className="text-[--color-text-muted] max-w-xs">
          Connect your wallet to create or access your multisig account.
        </p>
        <div className="pt-2">
          <ConnectWalletButton />
        </div>
      </div>
    </main>
  );
}
