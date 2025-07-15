"use client";

import { useMemo, useState } from "react";
import SetUpBasics from "./SetUpBasics";
import Button from "@/components/UI/Button";
import SetSigners from "./SetSigners";
import Review from "./Review";
import { useAccount, useDeployContract } from "wagmi";
import { CreateMultisigFormValues } from "@/types";
import { useToast } from "@/components/context/ToastContext";
import { useRouter } from "next/navigation";
import { MULTISIG_ABI, MULTISIG_BYTECODE } from "@/lib/contracts/multisig";
import { postMultisigToAPI } from "@/lib/api/multisigs";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/wagmiConfig";

export default function CreateWalletForm() {
  const { address } = useAccount();
  const { showToast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { deployContractAsync, isPending } = useDeployContract();

  const [formData, setFormData] = useState<CreateMultisigFormValues>({
    name: "My new wallet",
    chainId: 0,
    signers: address ? [address] : [],
    threshold: 1,
  });

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
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO add zod verification
      const { signers, threshold } = formData;
      const hash = await deployContractAsync({
        abi: MULTISIG_ABI,
        args: [signers, BigInt(threshold)],
        bytecode: MULTISIG_BYTECODE,
      });

      const receipt = await waitForTransactionReceipt(config, { hash });

      const contractAddr = receipt.contractAddress;

      if (!contractAddr || contractAddr === undefined)
        throw new Error("No contract address returned");

      if (address === undefined) throw new Error("No creator wallet detected");

      const payload = {
        ...formData,
        contractAddr,
        creatorWallet: address,
      };
      const res = await postMultisigToAPI(payload);
      console.log("res ", res);
      if (res && res.id) {
        showToast({ message: "Wallet deployed!", type: "success" });
        router.push("/welcome");
      } else {
        throw new Error("Failed to store multisig in backend");
      }
    } catch (error) {
      showToast({
        message: "Something went wrong. Please try again",
        type: "error",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepsComponents = useMemo(
    () => [
      <SetUpBasics formData={formData} setFormData={setFormData} />,
      <SetSigners formData={formData} setFormData={setFormData} />,
      <Review formData={formData} handleChange={handleChange} />,
    ],
    [formData]
  );

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
          <Button type="submit" className="w-64" disabled={isSubmitting}>
            {isSubmitting || isPending
              ? "Creating wallet.."
              : step < stepsComponents.length - 1
              ? "Next"
              : "Create new wallet"}
          </Button>
        </div>
      </form>
    </div>
  );
}
