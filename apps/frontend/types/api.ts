import { CreateMultisigFormValues } from "./form";

export type CreateMultisigPayload = CreateMultisigFormValues & {
  contractAddr: `0x${string}`; // deployed contract address
  creatorWallet: `0x${string}`; // wallet that initiated deployment
};
