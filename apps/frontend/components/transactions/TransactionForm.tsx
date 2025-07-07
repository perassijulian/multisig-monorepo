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
  const { writeAsync, isLoading, data, status } = useWriteMultisigContract({
    functionName: "submitTransaction",
    args: [formData.to, BigInt(formData.value), formData.data],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const tx = await writeAsync();
      console.log(tx);
      console.log(data, " data");
      console.log(status, " status");
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
