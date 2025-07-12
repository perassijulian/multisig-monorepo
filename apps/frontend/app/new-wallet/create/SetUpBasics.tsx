"use client";

import Input from "@/components/UI/Input";
import { FormDataType } from "./CreateWalletForm";
import { useChains } from "wagmi";
import { config } from "@/wagmiConfig";
import Select from "@/components/UI/Select";
import ChainSelect from "@/components/UI/Select";

interface SetUpBasicsType {
  formData: FormDataType;
  setFormData: (data: FormDataType) => void;
}

export default function SetUpBasics({
  formData,
  setFormData,
}: SetUpBasicsType) {
  const chains = useChains({ config });
  const chainOptions = chains.map((chain) => ({
    label: chain.name,
    value: chain.id,
  }));
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
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <ChainSelect
          label="Network you want to deploy"
          value={formData.chain}
          onChange={(e) => setFormData({ ...formData, chain: e.target.value })}
          options={chainOptions}
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
