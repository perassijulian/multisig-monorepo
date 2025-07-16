"use client";

import {
  useMultisigTransactions,
  useReadMultisigContract,
} from "@/lib/hooks/useMultisigContract";
import Table from "../UI/Table";
import { SetStateAction, useEffect } from "react";
import { parseTransactionRows } from "@/lib/tx/parsers";
import { useToast } from "../context/ToastContext";

type TxRow = [string, number, string, React.ReactNode, number, React.ReactNode];

const TABLE_HEAD = [
  "Recipient",
  "Value",
  "Data",
  "Executed",
  "Votes",
  "Actions",
];

export default function TransactionList({
  triggerRefetchTxs,
  setTriggerRefetchTxs,
}: {
  triggerRefetchTxs: boolean;
  setTriggerRefetchTxs: React.Dispatch<SetStateAction<boolean>>;
}) {
  const { showToast } = useToast();
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
    data,
    error: errorContracts,
    isLoading: isLoadingContracts,
    refetch,
  } = useMultisigTransactions(transactionCount);

  const isLoading = isLoadingContracts || isLoadingTxCount;

  useEffect(() => {
    if (triggerRefetchTxs) {
      refetchCount();
      refetch();
      setTriggerRefetchTxs(false);
    }
  }, [triggerRefetchTxs, refetchCount, refetch, setTriggerRefetchTxs]);

  if (isLoading) return <Table head={TABLE_HEAD} isLoading />;

  if (errorTxCount || errorContracts) {
    showToast({
      message: "Something went wrong. Please refresh the page.",
      type: "error",
    });
    console.error(errorTxCount || errorContracts);
    return (
      <Table
        head={TABLE_HEAD}
        errorMessage={"Something went wrong. Please refresh the page."} // We don't want to show the full error to client
      />
    );
  }

  if (!data || !Array.isArray(data) || data.length === 0)
    return <Table head={TABLE_HEAD} />;

  const body: TxRow[] = parseTransactionRows(data);

  return <Table head={TABLE_HEAD} body={body} />;
}
