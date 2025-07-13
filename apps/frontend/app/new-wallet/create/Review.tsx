"use client";

import { Fragment } from "react";
import { CreateMultisigFormValues } from "@/types";

interface ReviewType {
  formData: CreateMultisigFormValues;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Review({ formData, handleChange }: ReviewType) {
  const { chainId, name, signers, threshold } = formData;
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
          <dd className="text-text">{chainId}</dd>
          <dt className="font-medium text-textMuted">Name</dt>
          <dd className="text-text">{name}</dd>
          {signers.map((signer, i) => (
            <Fragment key={i}>
              <dt className="font-medium text-textMuted">
                {i === 0 ? "Signers" : ""}
              </dt>
              <dd className="text-text">{signer}</dd>
            </Fragment>
          ))}
          <dt className="font-medium text-textMuted">Threshold</dt>
          <dd className="text-text">{`${threshold} out of ${signers.length} signers`}</dd>
        </dl>
      </div>
    </div>
  );
}
