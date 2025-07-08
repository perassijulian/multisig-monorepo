"use client";

import { useReadMultisigContract } from "@/lib/hooks/useMultisigContract";
import Table from "../UI/Table";
import { MULTISIG_ABI, MULTISIG_ADDRESS } from "@/lib/contracts/multisig";
import { useReadContracts } from "wagmi";
import { shortenAddress } from "@/lib/utils";

type TxRow = [string, number, string, string, number];

export default function TransactionList() {
  const {
    data: countData,
    error: errorTxCount,
    isLoading: isLoadingTxCount,
  } = useReadMultisigContract({
    functionName: "getTransactionCount",
  });

  const transactionCount = Number(countData ?? 0);

  const contracts = Array.from({ length: transactionCount }, (_, i) => ({
    address: MULTISIG_ADDRESS,
    abi: MULTISIG_ABI,
    functionName: "getTransaction",
    args: [BigInt(i)],
  }));

  const {
    data: txData,
    error: errorContracts,
    isLoading: isLoadingContracts,
  } = useReadContracts({
    contracts,
  });

  // TODO add skeleton
  if (isLoadingTxCount || isLoadingContracts) return <div>Loading...</div>;
  if (errorTxCount) return <div>{errorTxCount.message}</div>;
  if (errorContracts) return <div>{errorContracts.message}</div>;
  if (txData === undefined) return <div>No data</div>;

  const body: TxRow[] = txData.flatMap((item) => {
    if (item.status !== "success" || !Array.isArray(item.result)) return [];
    const [to, value, data, executed, confirmations] = item.result;
    return [
      [
        shortenAddress(to),
        Number(value),
        data,
        executed ? "Yes" : "No",
        Number(confirmations),
      ],
    ];
  });

  return (
    <Table
      head={["Recipient", "Value", "Data", "Executed", "Positive Votes"]}
      body={body}
    />
  );
}
