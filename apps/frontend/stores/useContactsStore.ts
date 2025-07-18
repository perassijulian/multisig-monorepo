import { create } from "zustand";
import { ContactSchema } from "@/types";
import { getContactsFromAPI } from "@/lib/api/address-book";

type ContactsStore = {
  contacts: ContactSchema[];
  isLoading: boolean;
  error: string | null;
  fetchContacts: (wallet: `0x${string}`) => Promise<void>;
};

export const useContactsStore = create<ContactsStore>((set) => ({
  contacts: [],
  isLoading: false,
  error: null,
  fetchContacts: async (wallet: `0x${string}`) => {
    set({ isLoading: true, error: null });
    try {
      const data = await getContactsFromAPI({ wallet });
      set({ contacts: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
}));
