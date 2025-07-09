"use client";

import { MULTISIG_ADDRESS } from "@/lib/contracts/multisig";
import { formatEtherBalance } from "@/lib/utils";
import { useBalance } from "wagmi";
import Button from "../UI/Button";
import { useModal } from "../context/ModalContext";
import AddFunds from "./AddFunds";
import { formatEther } from "viem";

export default function ContractBalance() {
  const { data, isLoading, error } = useBalance({ address: MULTISIG_ADDRESS });
  const { openModal, closeModal } = useModal();
  // TODO add skeleton
  if (isLoading) return <div>loading..</div>;
  if (error) return <div>{error.message}</div>;
  if (!data) return <div>Error while fetching</div>;

  const balanceToDisplay = `${formatEtherBalance(formatEther(data.value))} ${
    data.symbol
  }`;
  return (
    <div className="flex flex-row justify-between items-center bg-bgSubtle w-content border border-border rounded px-4 py-2 shadow-xl">
      <div>
        <h2 className="text-xl">Contract Balance</h2>
        <h3 className="text-3xl mt-2">{balanceToDisplay}</h3>
      </div>
      <Button
        onClick={() => openModal(<AddFunds closeModal={closeModal} />)}
        className="w-32"
      >
        Add funds
      </Button>
    </div>
  );
}
