"use client";

import { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { sendFundsToContract } from "@/lib/tx/sendFundsToContract";
import { useAccount } from "wagmi";

export default function AddFunds({ closeModal }: { closeModal: () => void }) {
  const [value, setValue] = useState<number | "">("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { address } = useAccount();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value || value === 0) {
      // TODO: toast.error("Please enter a valid amount");
      console.warn("Missing or invalid value");
      return;
    }

    if (!address) {
      // TODO: toast.error("Wallet not connected");
      console.warn("Missing address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await sendFundsToContract({ value, address });

      if (!res.success) {
        console.error(res.error);
        // TODO: toast.error("Transaction failed");
        return;
      }

      // TODO: toast.success("Funds sent successfully");
      closeModal();
    } catch (err) {
      console.error("Unhandled error:", err);
      // TODO: toast.error("Something went wrong");
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
