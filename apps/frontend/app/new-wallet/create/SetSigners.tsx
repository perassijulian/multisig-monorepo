"use client";

import Input from "@/components/UI/Input";
import { CreateMultisigFormValues } from "@/types";
import { Plus, Trash2 } from "lucide-react";

interface SetSignersType {
  formData: CreateMultisigFormValues;
  setFormData: (data: CreateMultisigFormValues) => void;
}

export default function SetSigners({ formData, setFormData }: SetSignersType) {
  const { signers, threshold } = formData;

  const handleSignerChange = (index: number, value: string) => {
    const updatedSigners = [...signers];
    // Ensure the value starts with '0x' to match the type '`0x${string}`'
    const formattedValue = value.startsWith("0x") ? value : `0x${value}`;
    updatedSigners[index] = formattedValue as `0x${string}`;
    setFormData({ ...formData, signers: updatedSigners });
  };

  const addSigner = () => {
    setFormData({ ...formData, signers: [...signers, "0x"] });
  };

  const removeSigner = (index: number) => {
    const updatedSigners = [...signers];
    updatedSigners.splice(index, 1);
    setFormData({ ...formData, signers: updatedSigners });
  };

  const handleThresholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, threshold: Number(e.target.value) });
  };

  return (
    <div>
      <div className="flex items-center gap-4 border-b border-border p-4">
        <div className="rounded-full w-6 h-6 flex items-center justify-center bg-primary text-sm">
          2
        </div>
        <div>
          <h3 className="text-lg">Signers and confirmations</h3>
          <p className="text-sm text-textMuted">
            Set the signer wallets of your Safe Account and how many need to
            confirm to execute a valid transaction.
          </p>
        </div>
      </div>
      <div className="py-4 px-14">
        {signers.map((signer, i) => (
          <div key={i} className="flex items-bottom gap-2 mb-2">
            <Input
              className="w-[450px]"
              label={`Signer ${i + 1}`}
              name="signers"
              value={signer}
              onChange={(e) => handleSignerChange(i, e.target.value)}
            />
            <button
              type="button"
              onClick={() => removeSigner(i)}
              className="mt-8 p-1 hover:text-red-600"
            >
              <Trash2 className="text-red-500" size={18} />
            </button>
          </div>
        ))}
        <div
          onClick={() => addSigner()}
          className="text-primary flex items-center gap-1 cursor-pointer p-2 hover w-fit rounded hover:underline"
        >
          <Plus size={15} /> Add new signer
        </div>
        <Input
          label="Threshold"
          name="threshold"
          value={threshold}
          onChange={handleThresholdChange}
        />
      </div>
    </div>
  );
}
