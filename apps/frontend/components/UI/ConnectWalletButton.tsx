"use client";

import { shortenAddress } from "@/lib/utils";
import { useAccount, useDisconnect, useConnect } from "wagmi";
import { metaMask } from "wagmi/connectors";
import Blokies from "react-blockies";

export default function ConnectWalletButton() {
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  return (
    <div>
      {isConnected ? (
        address ? (
          <div className="flex items-center gap-1">
            <Blokies
              seed={address?.toLowerCase()}
              size={8}
              scale={4}
              className="rounded-full"
            />
            <p>{shortenAddress(address)}</p>
          </div>
        ) : null
      ) : (
        <button
          className="text-text bg-primary px-4 py-1 rounded-lg border border-border shadow-lg hover:bg-primaryHover  transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ring"
          onClick={() => connect({ connector: metaMask() })}
        >
          Connect wallet
        </button>
      )}
    </div>
  );
}
