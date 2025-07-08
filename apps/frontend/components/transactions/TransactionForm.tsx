"use client";

import { TransactionFormValues } from "@/types/transaction";
import { useState } from "react";
import Button from "../UI/Button";
import { useWriteMultisigContract } from "@/lib/hooks/useMultisigContract";

export default function TransactionForm() {
  const [formData, setFormData] = useState<TransactionFormValues>({
    to: "",
    value: "",
    data: "",
  });
  const submitTransaction = useWriteMultisigContract();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const to = formData.to.startsWith("0x") ? formData.to : `0x${formData.to}`;
    const data = formData.data.startsWith("0x")
      ? formData.data
      : `0x${formData.data}`;

    try {
      const tx = await submitTransaction("submitTransaction", [
        to as `0x${string}`,
        BigInt(formData.value),
        data as `0x${string}`,
      ]);
      console.log("tx processed: ", tx);
    } catch (err) {
      console.error("Transaction failed", err);
    }
  };

  return (
    <div className="w-96 border border-border rounded p-2 shadow-xl bg-bgSubtle">
      <h2 className="text-xl">Create a transaction</h2>
      <form className="w-full" onSubmit={handleSubmit}>
        <label htmlFor="to" className="mt-2 block text-sm font-medium">
          Recipient
        </label>
        <input
          className="text-black w-full rounded px-2 py-1 border border-border"
          id="to"
          type="text"
          value={formData.to}
          name="to"
          onChange={handleChange}
          required
        />
        <label htmlFor="value" className="mt-2 block text-sm font-medium">
          Value
        </label>
        <input
          className="text-black w-full rounded px-2 py-1 border border-border"
          id="value"
          type="text"
          value={formData.value}
          name="value"
          onChange={handleChange}
          required
        />
        <label htmlFor="data" className="mt-2 block text-sm font-medium">
          Data
        </label>
        <input
          className="text-black w-full rounded px-2 py-1 border border-border"
          id="data"
          type="text"
          value={formData.data}
          name="data"
          onChange={handleChange}
          required
        />
        <div className="mx-auto w-64">
          <Button className="mt-4" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
