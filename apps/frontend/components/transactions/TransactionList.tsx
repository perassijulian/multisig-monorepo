"use client";

import {
  useMultisigTransactions,
  useReadMultisigContract,
} from "@/lib/hooks/useMultisigContract";
import Table from "../UI/Table";
import { SetStateAction, useEffect } from "react";
import { parseTransactionRows } from "@/lib/tx/parsers";
import Skeleton from "../UI/Skeleton";
import { useToast } from "../context/ToastContext";

type TxRow = [string, number, string, React.ReactNode, number, React.ReactNode];

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
  }, [triggerRefetchTxs]);

  // TODO add skeleton
  if (isLoading)
    return (
      <Table
        head={["Recipient", "Value", "Data", "Executed", "Votes", "Actions"]}
        body={[
          [<Skeleton height="h-6" width="w-full" />],
          [<Skeleton height="h-6" width="w-full" />],
        ]}
      />
    );

  if (errorTxCount) {
    showToast({
      message: "Something happened. Reload the page",
      type: "error",
    });
    console.error(errorTxCount.message);
    return;
  }
  if (errorContracts) {
    showToast({
      message: "Something happened. Reload the page",
      type: "error",
    });
    console.error(errorContracts.message);
    return;
  }

  const body: TxRow[] | string =
    data === undefined ? "No data" : parseTransactionRows(data);

  return (
    <Table
      head={["Recipient", "Value", "Data", "Executed", "Votes", "Actions"]}
      body={body}
    />
  );
}
