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
          className="bg-primary text-white px-4 py-2 rounded"
          onClick={() => connect({ connector: metaMask() })}
        >
          Connect walletd
        </button>
      )}
    </div>
  );
}
