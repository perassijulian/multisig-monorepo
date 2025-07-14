"use client";

import { useEffect, useState } from "react";
import OwnerList from "../owners/OwnerList";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import { useRouter, useSearchParams } from "next/navigation";
import { parseSafeParam } from "@/lib/utils/parseSafeParam";
import { useToast } from "../context/ToastContext";
import { useMultisig, useSetMultisig } from "../context/MultisigContext";

// we make this component so we don't make the whole /assets CSR
export default function ClientTxWrapper() {
  const [triggerRefetchTxs, setTriggerRefetchTxs] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const router = useRouter();
  const setMultisigData = useSetMultisig();
  const multisig = useMultisig();
  console.log("multisig context:", multisig);
  useEffect(() => {
    const safeParam = searchParams.get("wallet");
    const parsed = parseSafeParam(safeParam);
    if (!parsed) {
      showToast({ message: "Wallet not valid", type: "error" });
      // TODO make a that wallet is not available page or component
      //setTimeout(() => router.push("/welcome"), 3000);
    } else {
      if (setMultisigData) {
        setMultisigData(parsed);
      }
    }
  }, [searchParams, router]);

  return (
    <div className="flex gap-4">
      <OwnerList />
      <TransactionForm setTriggerRefetchTxs={setTriggerRefetchTxs} />
      <TransactionList
        triggerRefetchTxs={triggerRefetchTxs}
        setTriggerRefetchTxs={setTriggerRefetchTxs}
      />
    </div>
  );
}
