"use client";

import Input from "@/components/UI/Input";
import { FormDataType } from "./CreateWalletForm";
import { Plus } from "lucide-react";

interface SetSignersType {
  formData: FormDataType;
  setFormData: (data: FormDataType) => void;
}

export default function SetSigners({ formData, setFormData }: SetSignersType) {
  const { signers, threshold } = formData;

  const handleSignerChange = (index: number, value: string) => {
    const updatedSigners = [...signers];
    updatedSigners[index] = value;
    setFormData({ ...formData, signers: updatedSigners });
  };

  const addSigner = () => {
    setFormData({ ...formData, signers: [...signers, ""] });
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
          <Input
            key={i}
            keyTag={i}
            label={`Signer ${i + 1}`}
            name="signers"
            value={signer}
            onChange={(e) => handleSignerChange(i, e.target.value)}
          />
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
