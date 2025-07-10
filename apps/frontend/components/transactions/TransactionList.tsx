"use client";

import { useReadMultisigContract } from "@/lib/hooks/useMultisigContract";
import Table from "../UI/Table";
import { MULTISIG_ABI, MULTISIG_ADDRESS } from "@/lib/contracts/multisig";
import { useReadContracts } from "wagmi";
import { shortenAddress } from "@/lib/utils";
import TransactionActions from "./TransactionActions";
import ExecutedStatus from "./ExecutedStatus";
import { SetStateAction, useEffect } from "react";

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

  //TODO make its own useReadManyMultisigContract hook
  const contracts = Array.from({ length: transactionCount }, (_, i) => ({
    address: MULTISIG_ADDRESS as `0x${string}`,
    abi: MULTISIG_ABI,
    functionName: "getTransaction",
    args: [BigInt(i)],
  }));

  const {
    data: txData,
    error: errorContracts,
    isLoading: isLoadingContracts,
    refetch,
  } = useReadContracts({
    contracts,
  });

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

  const body: TxRow[] = txData.flatMap((item, txIndex) => {
    if (item.status !== "success" || !Array.isArray(item.result)) return [];
    const [to, value, data, executed, confirmations] = item.result;
    const confirmationsNumber = Number(confirmations);
    return [
      [
        shortenAddress(to),
        Number(value),
        data,
        <ExecutedStatus
          executed={executed}
          confirmationsNumber={confirmationsNumber}
          txIndex={txIndex}
        />,
        confirmationsNumber,
        <TransactionActions executed={executed} txIndex={txIndex} />,
      ],
    ];
  });

  return (
    <Table
      head={["Recipient", "Value", "Data", "Executed", "Votes", "Actions"]}
      body={body}
    />
  );
}
