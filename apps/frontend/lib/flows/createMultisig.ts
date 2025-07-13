import { FormDataType } from "@/app/new-wallet/create/CreateWalletForm";
import { deployMultisigContract } from "../contracts/deployMultisig";
import { postMultisigToAPI } from "../api/multisigs";

export async function createMultisigFlow(formData: FormDataType) {
  const contractAddr = await deployMultisigContract(formData);

  return await postMultisigToAPI({
    ...formData,
    contractAddr,
    creatorWallet: formData.signers[0],
  });
}
