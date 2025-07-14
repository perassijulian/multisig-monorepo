"use client";

import { createContext, useContext, useState } from "react";

export type MultisigData = { chain: string; address: `0x${string}` };

const MultisigContext = createContext<MultisigData | undefined>(undefined);
const MultisigSetterContext = createContext<
  ((data: MultisigData) => void) | undefined
>(undefined);

export function MultisigProvider({ children }: { children: React.ReactNode }) {
  const [multisigData, setMultisigData] = useState<MultisigData | undefined>();

  return (
    <MultisigContext.Provider value={multisigData}>
      <MultisigSetterContext.Provider value={setMultisigData}>
        {children}
      </MultisigSetterContext.Provider>
    </MultisigContext.Provider>
  );
}
export function useMultisig() {
  const ctx = useContext(MultisigContext);
  if (!ctx) throw new Error("useMultisig must be used within MultisigProvider");
  return ctx;
}

export function useSetMultisig() {
  const ctx = useContext(MultisigSetterContext);
  if (!ctx)
    throw new Error("useSetMultisig must be used within MultisigProvider");
  return ctx;
}
