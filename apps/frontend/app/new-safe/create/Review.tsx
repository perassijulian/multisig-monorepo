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
      <div className="flex items-center">
        <div>3</div>
        <div>
          <h3>Review</h3>
          <p>
            You're about to create a new Safe Account and will have to confirm
            the transaction with your connected wallet.
          </p>
        </div>
      </div>
    </div>
  );
}
