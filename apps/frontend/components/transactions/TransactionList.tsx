"use client";

import {
  useMultisigTransactions,
  useReadMultisigContract,
} from "@/lib/hooks/useMultisigContract";
import Table from "../UI/Table";
import { SetStateAction, useEffect, useMemo } from "react";
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
  const fallbackRow: TxRow = ["-", 0, "-", "No transactions found", 0, ""];
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
        body={[["Error loading transactions", "", "", "", "", ""]]}
      />
    );
  }

  const body = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) return [];
    return parseTransactionRows(data);
  }, [data]);

  return <Table head={TABLE_HEAD} body={body} />;
}
