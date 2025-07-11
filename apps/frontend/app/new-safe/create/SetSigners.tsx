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
      <div className="flex items-center">
        <div>2</div>
        <div>
          <h3>Signers and confirmations</h3>
          <p>
            Set the signer wallets of your Safe Account and how many need to
            confirm to execute a valid transaction.
          </p>
        </div>
      </div>
      <div>
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
