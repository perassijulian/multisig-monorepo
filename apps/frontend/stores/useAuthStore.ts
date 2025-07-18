import { create } from "zustand";

type AuthStore = {
  address: `0x${string}` | null;
  chainId: number | null;
  isAuthenticated: boolean;
  setSession: (args: {
    address: `0x${string}`;
    chainId: number;
    isAuthenticated: boolean;
  }) => void;
  reset: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  address: null,
  chainId: null,
  isAuthenticated: false,
  setSession: ({ address, chainId, isAuthenticated }) =>
    set({ address, chainId, isAuthenticated }),
  reset: () => set({ address: null, chainId: null, isAuthenticated: false }),
}));
