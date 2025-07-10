"use client";

import {
  useMultisigTransactions,
  useReadMultisigContract,
} from "@/lib/hooks/useMultisigContract";
import Table from "../UI/Table";
import { SetStateAction, useEffect } from "react";
import { parseTransactionRows } from "@/lib/tx/parsers";

type TxRow = [string, number, string, React.ReactNode, number, React.ReactNode];

export default function TransactionList({
  triggerRefetchTxs,
  setTriggerRefetchTxs,
}: {
  triggerRefetchTxs: boolean;
  setTriggerRefetchTxs: React.Dispatch<SetStateAction<boolean>>;
}) {
  const {
    data: countData,
    error: errorTxCount,
    isLoading: isLoadingTxCount,
    refetch: refetchCount,
  } = useReadMultisigContract({
    functionName: "getTransactionCount",
  });

  const transactionCount = Number(countData ?? 0);

  const {
    data: txData,
    error: errorContracts,
    isLoading: isLoadingContracts,
    refetch,
  } = useMultisigTransactions(transactionCount);

  useEffect(() => {
    if (triggerRefetchTxs) {
      refetchCount();
      refetch();
      setTriggerRefetchTxs(false);
    }
  }, [triggerRefetchTxs]);

  // TODO add skeleton
  if (isLoadingTxCount || isLoadingContracts) return <div>Loading...</div>;
  if (errorTxCount) return <div>{errorTxCount.message}</div>;
  if (errorContracts) return <div>{errorContracts.message}</div>;
  if (txData === undefined) return <div>No data</div>;

  const body: TxRow[] = parseTransactionRows(txData);

  return (
    <Table
      head={["Recipient", "Value", "Data", "Executed", "Votes", "Actions"]}
      body={body}
    />
  );
}
