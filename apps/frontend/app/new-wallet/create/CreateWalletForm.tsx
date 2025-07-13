"use client";

import { useState } from "react";
import SetUpBasics from "./SetUpBasics";
import Button from "@/components/UI/Button";
import SetSigners from "./SetSigners";
import Review from "./Review";
import { useAccount } from "wagmi";
import { createMultisigFlow } from "@/lib/flows/createMultisig";
import { CreateMultisigFormValues } from "@/types";

export default function CreateWalletForm() {
  const { address } = useAccount();

  const emptyFormData = {
    name: "My new wallet",
    chainId: 0,
    signers: [address as `0x${string}`],
    threshold: 1,
  };

  const [formData, setFormData] =
    useState<CreateMultisigFormValues>(emptyFormData);
  const [step, setStep] = useState<number>(0);

  const next = () => setStep(Math.min(step + 1, stepsComponents.length - 1));
  const back = () => setStep(Math.max(step - 1, 0));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < stepsComponents.length - 1) {
      next();
    } else {
      const res = await createMultisigFlow(formData);
    }
  };

  const stepsComponents = [
    <SetUpBasics formData={formData} setFormData={setFormData} />,
    <SetSigners formData={formData} setFormData={setFormData} />,
    <Review formData={formData} handleChange={handleChange} />,
  ];

  return (
    <div className="bg-bgSubtle border border-border rounded shadow-xl">
      <form onSubmit={handleSubmit}>
        {stepsComponents[step]}
        <div className="flex justify-around mt-6 py-4 border-t border-border">
          <Button
            onClick={() => back()}
            disabled={step === 0}
            className="w-64"
            variant="secondary"
          >
            Back
          </Button>
          <Button type="submit" className="w-64">
            {step < stepsComponents.length - 1 ? "Next" : "Create new wallet"}
          </Button>
        </div>
      </form>
    </div>
  );
}
