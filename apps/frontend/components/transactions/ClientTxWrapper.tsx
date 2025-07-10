"use client";

import { useState } from "react";
import OwnerList from "../owners/OwnerList";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";

// we make this component so we don't make the whole /assets CSR
export default function ClientTxWrapper() {
  const [triggerRefetchTxs, setTriggerRefetchTxs] = useState<boolean>(false);
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
