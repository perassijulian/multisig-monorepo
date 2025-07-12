"use client";

import { shortenAddress } from "@/lib/utils";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { metaMask } from "wagmi/connectors";
import Blokies from "react-blockies";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function ConnectWalletButton() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, []);

  // TODO until we do the full backend verification
  useEffect(() => {
    if (isConnected) {
      Cookies.set("walletConnected", "true", { path: "/" });
      router.push("/welcome");
    } else {
      Cookies.remove("walletConnected");
    }
  }, [isConnected, router]);

  if (!isMounted)
    // TODO use skeleton
    return <div className="w-[150px] h-10 bg-bg animate-pulse rounded-md" />;

  console.log(address);
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
            <button onClick={() => disconnect()}>Disconnect</button>
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
