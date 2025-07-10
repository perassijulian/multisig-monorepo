"use client";

import { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { sendFundsToContract } from "@/lib/tx/sendFundsToContract";
import { useAccount } from "wagmi";
import { useToast } from "../context/ToastContext";

export default function AddFunds({ closeModal }: { closeModal: () => void }) {
  const [value, setValue] = useState<number | "">("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showToast } = useToast();
  const { address } = useAccount();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value || value === 0) {
      showToast({ message: "Please enter a valid amount", type: "error" });
      return;
    }

    if (!address) {
      showToast({ message: "Wallet not connected", type: "error" });
      return;
    }

    setIsLoading(true);

    try {
      const res = await sendFundsToContract({ value, address });

      if (!res.success) {
        showToast({ message: "Transaction failed", type: "error" });
        console.error(res.error);
        return;
      }
      showToast({ message: "Funds sent successfully", type: "success" });
      closeModal();
    } catch (err) {
      showToast({ message: "Something went wrong", type: "error" });
      console.error("Unhandled error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl">Add Funds</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="ETH amount"
          name="value"
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />

        <Button disabled={isLoading} className="mt-4" type="submit">
          {isLoading ? "loading.." : "Send"}
        </Button>
      </form>
    </div>
  );
}
