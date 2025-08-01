"use client";

import { shortenAddress } from "@/lib/utils";
import {
  useAccount,
  useAccountEffect,
  useConnect,
  useDisconnect,
  useSignMessage,
} from "wagmi";
import { metaMask } from "wagmi/connectors";
import Blokies from "react-blockies";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Skeleton from "./Skeleton";
import { signInWithEthereum } from "@/lib/api/auth/siwe";
import { useAuthStore } from "@/stores/useAuthStore";
import { checkAndSetSession } from "@/lib/flows/session";

export default function ConnectWalletButton() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const router = useRouter();
  const isSigningIn = useRef<boolean>(false);

  useEffect(() => {
    if (!isMounted) setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isConnected) {
      checkAndSetSession();
    } else {
      useAuthStore.getState().reset();
    }
  }, [isConnected]);

  useAccountEffect({
    async onConnect({ address, chainId }) {
      const { isAuthenticated } = useAuthStore.getState();
      if (isSigningIn.current || isAuthenticated) return;
      isSigningIn.current = true;

      try {
        const simpleSignMessage = (msg: string) =>
          signMessageAsync({ message: msg });
        await signInWithEthereum(address, chainId, simpleSignMessage);
        useAuthStore
          .getState()
          .setSession({ address, chainId, isAuthenticated: true });
        router.push("/welcome");
      } catch (error) {
        console.error(error);
      }
    },
    onDisconnect() {
      router.push("/");
    },
  });

  if (!isMounted) return <Skeleton className="w-36 h-8" />;

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
