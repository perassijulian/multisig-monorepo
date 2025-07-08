"use client";

import { useWriteMultisigContract } from "@/lib/hooks/useMultisigContract";
import { Check, X } from "lucide-react";

export default function TransactionActions({ txIndex }: { txIndex: number }) {
  const handleWriteToContract = useWriteMultisigContract();
  const handleConfirm = async () => {
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
      <Check
        onClick={handleConfirm}
        className="cursor-pointer text-green-500 transition-all duration-150 ease-in-out hover:text-green-400 hover:drop-shadow-glowGreen hover:scale-110"
      />
      <X
        onClick={handleRevoke}
        className="cursor-pointer text-red-500 transition-all duration-150 ease-in-out hover:text-red-400 hover:drop-shadow-glowRed hover:scale-110"
      />
    </div>
  );
}
