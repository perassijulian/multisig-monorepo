export type CreateMultisigFormValues = {
  name: string;
  chainId: number;
  signers: `0x${string}`[];
  threshold: number;
};
