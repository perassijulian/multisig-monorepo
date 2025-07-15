"use client";

import { TransactionFormValues } from "@/types/transaction";
import { SetStateAction, useState } from "react";
import Button from "../UI/Button";
import { useWriteMultisigContract } from "@/lib/hooks/useMultisigContract";
import { useToast } from "../context/ToastContext";
import Input from "../UI/Input";

const EMPTY_FORM_DATA: TransactionFormValues = {
  to: "",
  value: "",
  data: "",
};

export default function TransactionForm({
  setTriggerRefetchTxs,
}: {
  setTriggerRefetchTxs: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [formData, setFormData] =
    useState<TransactionFormValues>(EMPTY_FORM_DATA);
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const submitTransaction = useWriteMultisigContract();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!/^0x[a-fA-F0-9]{40}$/.test(formData.to)) {
      showToast({ message: "Invalid recipient address", type: "error" });
      return;
    }
    const { to } = formData;

    if (isNaN(Number(formData.value))) {
      showToast({ message: "Invalid ETH value", type: "error" });
      return;
    }

    let value: bigint;
    try {
      value = BigInt(formData.value);
    } catch {
      showToast({ message: "Invalid value format", type: "error" });
      return;
    }

    const data = formData.data.startsWith("0x")
      ? formData.data
      : `0x${formData.data}`;

    try {
      setIsSubmitting(true);
      await submitTransaction("submitTransaction", [
        to as `0x${string}`,
        value,
        data as `0x${string}`,
      ]);

      setTriggerRefetchTxs(true);
      showToast({ message: "Proposal successfully made!", type: "success" });
      setFormData(EMPTY_FORM_DATA);
    } catch (err) {
      showToast({
        message: "Transaction failed. Please try again",
        type: "error",
      });
      console.error("Transaction failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-96 border border-border rounded p-2 shadow-xl bg-bgSubtle">
      <h2 className="text-xl">Create a transaction</h2>
      <form className="w-full" onSubmit={handleSubmit}>
        <Input
          label="Recipient"
          name="to"
          value={formData.to}
          onChange={handleChange}
          required
        />
        <Input
          label="Value"
          name="value"
          type="number"
          value={formData.value}
          onChange={handleChange}
          required
        />
        <Input
          label="Data"
          name="data"
          value={formData.data}
          onChange={handleChange}
        />
        <Button
          className="mt-4 mx-auto w-full"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating.." : "Submit"}
        </Button>
      </form>
    </div>
  );
}
