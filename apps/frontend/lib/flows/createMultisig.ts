import { deployMultisigContract } from "../contracts/deployMultisig";
import { postMultisigToAPI } from "../api/multisigs";
import { CreateMultisigFormValues } from "@/types";

export async function createMultisigFlow(formData: CreateMultisigFormValues) {
  const contractAddr = await deployMultisigContract(formData);

  return await postMultisigToAPI({
    ...formData,
    contractAddr,
    creatorWallet: formData.signers[0],
  });
}
