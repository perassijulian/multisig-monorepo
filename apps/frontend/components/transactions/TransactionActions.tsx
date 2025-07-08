"use client";

import {
  useReadMultisigContract,
  useWriteMultisigContract,
} from "@/lib/hooks/useMultisigContract";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { useAccount } from "wagmi";

export default function TransactionActions({ txIndex }: { txIndex: number }) {
  const handleWriteToContract = useWriteMultisigContract();
  const { address } = useAccount();

  const { data: isConfirmed, isLoading } = useReadMultisigContract({
    functionName: "isConfirmed",
    args: [BigInt(txIndex), address as `0x${string}`],
  });

  const handleConfirm = async () => {
    if (isConfirmed) {
      // TODO: add toast
      console.log("You already confirmed this tx");
      return;
    }

    try {
      const tx = await handleWriteToContract("confirmTransaction", [
        BigInt(txIndex),
      ]);
      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRevoke = async () => {
    // TODO: mock contract call before calling the contract to know if it will revert
    try {
      const tx = await handleWriteToContract("revokeConfirmation", [
        BigInt(txIndex),
      ]);
      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-2 items-center justify-center">
      {/** TODO add skeleton */}
      {isLoading ? (
        <div>loading</div>
      ) : (
        <Check
          onClick={handleConfirm}
          className={cn(
            isConfirmed
              ? "text-green-900"
              : "cursor-pointer text-green-500 transition-all duration-150 ease-in-out hover:text-green-400 hover:drop-shadow-glowGreen hover:scale-110"
          )}
        />
      )}
      <X
        onClick={handleRevoke}
        className="cursor-pointer text-red-500 transition-all duration-150 ease-in-out hover:text-red-400 hover:drop-shadow-glowRed hover:scale-110"
      />
    </div>
  );
}
