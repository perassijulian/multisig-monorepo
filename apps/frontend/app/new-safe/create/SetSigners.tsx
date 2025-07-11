"use client";

import Input from "@/components/UI/Input";
import { FormDataType } from "./CreateWalletForm";

interface SetSignersType {
  formData: FormDataType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SetSigners({ formData, handleChange }: SetSignersType) {
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
        <Input
          label="Signers"
          name="signers"
          value={formData.signers}
          onChange={handleChange}
        />
        <Input
          label="Threshold"
          name="threshold"
          value={formData.threshold}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
