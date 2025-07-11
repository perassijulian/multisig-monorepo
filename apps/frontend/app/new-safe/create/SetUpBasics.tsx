"use client";

import Input from "@/components/UI/Input";
import { FormDataType } from "./CreateWalletForm";

interface SetUpBasicsType {
  formData: FormDataType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SetUpBasics({
  formData,
  handleChange,
}: SetUpBasicsType) {
  return (
    <div>
      <div className="flex items-center gap-4 border-b border-border p-4">
        <div className="rounded-full w-6 h-6 flex items-center justify-center bg-primary text-sm">
          1
        </div>
        <div>
          <h3 className="text-lg">Set up the basics</h3>
          <p className="text-sm text-textMuted">
            Give a name to your account and select which networks to deploy it
            on
          </p>
        </div>
      </div>
      <div className="py-4 px-14">
        <Input
          label="Name of your multisig"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          label="Network you want to deploy"
          name="chain"
          value={formData.chain}
          onChange={handleChange}
        />
      </div>
      <p className="text-sm text-textMuted px-14">
        By continuing, you agree to our{" "}
        <span className="text-primary underline cursor-pointer">
          terms of use
        </span>{" "}
        and{" "}
        <span className="text-primary underline cursor-pointer">
          privacy policy
        </span>
        .
      </p>
    </div>
  );
}
