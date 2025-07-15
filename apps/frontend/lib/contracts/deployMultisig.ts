// NOT USING CURRENTLY

"use client";

import { CreateMultisigFormValues } from "@/types";
import { useDeployContract } from "wagmi";
import { MULTISIG_ABI, MULTISIG_BYTECODE } from "./multisig";

export async function deployMultisigContract(
  formData: CreateMultisigFormValues
): Promise<ReturnType<typeof deployContract>> {
  const { deployContract } = useDeployContract();
  const { signers, threshold } = formData;
  deployContract({
    abi: MULTISIG_ABI,
    args: [signers, BigInt(threshold)],
    bytecode: MULTISIG_BYTECODE,
  });
}
