export type CreateMultisigFormValues = {
  name: string;
  chainId: number;
  signers: `0x${string}`[];
  threshold: number;
};

export type CreateContactFormValues = {
  name: string;
  creator: `0x${string}`;
  address: `0x${string}`;
};
