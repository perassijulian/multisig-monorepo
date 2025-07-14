import { create } from "zustand";

interface MultisigState {
  chain: string | null;
  address: string | null;
  setMultisigData: (chain: string, address: string) => void;
}

export const useMultisigStore = create<MultisigState>((set) => ({
  chain: null,
  address: null,
  setMultisigData: (chain, address) => set({ chain, address }),
}));
