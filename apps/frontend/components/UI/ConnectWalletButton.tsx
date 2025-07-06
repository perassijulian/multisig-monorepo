"use client";

import { useAccount, useDisconnect, useConnect } from "wagmi";
import { metaMask } from "wagmi/connectors";

export default function ConnectWalletButton() {
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  return (
    <div>
      {isConnected ? (
        <div>
          <p>Connected as: tu mama</p>
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
      ) : (
        <button
          className="text-text bg-primary px-4 py-2 rounded-lg border border-border shadow-lg hover:bg-primaryHover  transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ring"
          onClick={() => connect({ connector: metaMask() })}
        >
          Connect wallet
        </button>
      )}
    </div>
  );
}
