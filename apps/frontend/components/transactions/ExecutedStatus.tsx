"use client";

import {
  useReadMultisigContract,
  useWriteMultisigContract,
} from "@/lib/hooks/useMultisigContract";

export default function ExecutedStatus({
  executed,
  confirmationsNumber,
  txIndex,
}: {
  executed: boolean;
  confirmationsNumber: number;
  txIndex: number;
}) {
  const { data, isLoading } = useReadMultisigContract({
    functionName: "numConfirmationsRequired",
  });
  const confirmationsRequired = Number(data);

  const executeTransaction = useWriteMultisigContract();

  console.log({
    txIndex,
    executed,
    confirmationsNumber,
    confirmationsRequired,
  });
  const handleExecution = async () => {
    try {
      const tx = await executeTransaction("executeTransaction", [
        BigInt(txIndex),
      ]);
      console.log("tx processed: ", tx);
    } catch (error) {
      console.error(error);
    }
  };

  //TODO add skeleton
  if (isLoading) return <div>loading..</div>;

  if (executed) return <p className="text-xs text-green-800">EXECUTED</p>;

  if (confirmationsNumber < confirmationsRequired)
    return <p className="text-xs text-gray-700">NOT READY</p>;

  return (
    <button
      onClick={handleExecution}
      className="text-xs text-primary hover:text-primaryHover hover:scale-105 transition-colors duration-300"
    >
      EXECUTE NOW
    </button>
  );
}
