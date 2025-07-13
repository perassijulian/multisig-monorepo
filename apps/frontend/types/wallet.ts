// returned from backend

export type Multisig = {
  id: string;
  name: string;
  chainId: number;
  contractAddr: `0x${string}`;
  threshold: number;
  createdAt: string; // ISO timestamp
  creatorId: string;
  signers: {
    id: string;
    wallet: `0x${string}`;
  }[];
};
