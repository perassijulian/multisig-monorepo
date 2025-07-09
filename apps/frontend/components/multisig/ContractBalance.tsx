"use client";

import { MULTISIG_ADDRESS } from "@/lib/contracts/multisig";
import { formatBalance } from "@/lib/utils";
import { useBalance } from "wagmi";
import Button from "../UI/Button";

export default function ContractBalance() {
  const { data, isLoading, error } = useBalance({ address: MULTISIG_ADDRESS });

  // TODO add skeleton
  if (isLoading) return <div>loading..</div>;
  if (error) return <div>{error.message}</div>;
  if (!data) return <div>Error while fetching</div>;

  const balanceToDisplay = `${formatBalance(Number(data.value))} ${
    data.symbol
  }`;
  return (
    <div className="flex flex-row justify-between items-center bg-bgSubtle w-content border border-border rounded px-4 py-2 shadow-xl">
      <div>
        <h2 className="text-xl">Contract Balance</h2>
        <h3 className="text-3xl mt-2">{balanceToDisplay}</h3>
      </div>
      <Button className="w-32">Add funds</Button>
    </div>
  );
}
