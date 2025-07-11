"use client";

import Input from "@/components/UI/Input";
import { FormDataType } from "./CreateWalletForm";

interface ReviewType {
  formData: FormDataType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Review({ formData, handleChange }: ReviewType) {
  return (
    <div>
      <div className="flex items-center gap-4 border-b border-border p-4">
        <div className="rounded-full w-6 h-6 flex items-center justify-center bg-primary text-sm">
          3
        </div>
        <div>
          <h3 className="text-lg">Review</h3>
          <p className="text-sm text-textMuted">
            You're about to create a new Safe Account and will have to confirm
            the transaction with your connected wallet.
          </p>
        </div>
      </div>
      <div className="py-4 px-14">
        <dl className="grid grid-cols-[120px_1fr] gap-y-4 gap-x-6 text-sm">
          <dt className="font-medium text-textMuted">Network</dt>
          <dd className="text-text">{formData.chain}</dd>
          <dt className="font-medium text-textMuted">Name</dt>
          <dd className="text-text">{formData.name}</dd>
          <dt className="font-medium text-textMuted">Signers</dt>
          <dd className="text-text">{formData.signers}</dd>
          <dt className="font-medium text-textMuted">Threshold</dt>
          <dd className="text-text">{`${formData.threshold} out of ${formData.threshold} signers`}</dd>
        </dl>
      </div>
    </div>
  );
}
