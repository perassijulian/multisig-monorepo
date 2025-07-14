"use client";

import {
  useReadMultisigContract,
  useWriteMultisigContract,
} from "@/lib/hooks/useMultisigContract";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { useAccount } from "wagmi";
import { useToast } from "../context/ToastContext";
import Skeleton from "../UI/Skeleton";

export default function TransactionActions({
  txIndex,
  executed,
}: {
  txIndex: number;
  executed: boolean;
}) {
  const handleWriteToContract = useWriteMultisigContract();
  const { address } = useAccount();
  const { showToast } = useToast();

  const { data: isConfirmed, isLoading } = useReadMultisigContract({
    functionName: "isConfirmed",
    args: [BigInt(txIndex), address as `0x${string}`],
  });

  const handleConfirm = async () => {
    if (isConfirmed) {
      showToast({ message: "You already confirmed this tx", type: "error" });
      return;
    }

    try {
      const tx = await handleWriteToContract("confirmTransaction", [
        BigInt(txIndex),
      ]);
      showToast({ message: "You successfully voted!" });
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
  return isLoading ? (
    <Skeleton />
  ) : (
    <div className="flex gap-2 items-center justify-center">
      <Check
        onClick={handleConfirm}
        className={cn(
          isConfirmed || executed
            ? "text-green-900"
            : "cursor-pointer text-green-500 transition-all duration-150 ease-in-out hover:text-green-400 hover:drop-shadow-glowGreen hover:scale-110"
        )}
      />
      <X
        onClick={handleRevoke}
        className={cn(
          executed
            ? "text-red-900"
            : "cursor-pointer text-red-500 transition-all duration-150 ease-in-out hover:text-red-400 hover:drop-shadow-glowRed hover:scale-110"
        )}
      />
    </div>
  );
}
