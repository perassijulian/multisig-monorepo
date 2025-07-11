"use client";

import { useState } from "react";
import SetUpBasics from "./SetUpBasics";
import Button from "@/components/UI/Button";
import SetSigners from "./SetSigners";
import Review from "./Review";

export type FormDataType = {
  name: string;
  chain: string;
  signers: string[];
  threshold: number;
};

const steps = ["Set up basics", "Set signers", "Review"];

export default function CreateWalletForm() {
  const emptyFormData = {
    name: "",
    chain: "",
    signers: [""],
    threshold: 1,
  };
  const [formData, setFormData] = useState<FormDataType>(emptyFormData);
  const [step, setStep] = useState<number>(1);

  const next = () => setStep(Math.min(step + 1, steps.length));
  const back = () => setStep(Math.max(step - 1, 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < steps.length) next();

    console.log(formData);
  };

  const stepToRender = () => {
    switch (step) {
      case 1:
        return <SetUpBasics formData={formData} handleChange={handleChange} />;
      case 2:
        return <SetSigners formData={formData} setFormData={setFormData} />;
      case 3:
        return <Review formData={formData} handleChange={handleChange} />;
    }
  };

  return (
    <div className="bg-bgSubtle border border-border rounded shadow-xl">
      <form onSubmit={handleSubmit}>
        {stepToRender()}
        <div className="flex justify-around mt-6 py-4 border-t border-border">
          <Button
            onClick={() => back()}
            disabled={step === 1}
            className="w-24"
            variant="secondary"
          >
            Back
          </Button>
          <Button type="submit" className="w-24">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}
