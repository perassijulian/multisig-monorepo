import ExecutedStatus from "@/components/transactions/ExecutedStatus";
import TransactionActions from "@/components/transactions/TransactionActions";
import { shortenAddress } from "@/lib/utils";

type TxRow = [string, number, string, React.ReactNode, number, React.ReactNode];

export function parseTransactionRows(data: any[]): TxRow[] {
  return data.flatMap((item, txIndex): TxRow[] => {
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
}
