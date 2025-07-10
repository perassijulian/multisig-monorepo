"use client";

import { MULTISIG_ADDRESS } from "@/lib/contracts/multisig";
import { formatEtherBalance } from "@/lib/utils";
import { useBalance } from "wagmi";
import Button from "../UI/Button";
import { useModal } from "../context/ModalContext";
import AddFunds from "./AddFunds";
import { formatEther } from "viem";
import { useToast } from "../context/ToastContext";
import Skeleton from "../UI/Skeleton";
import { useEffect, useState } from "react";

export default function ContractBalance() {
  const [refetchBalance, setRefetchBalance] = useState<boolean>(false);
  const { data, error, isLoading, refetch } = useBalance({
    address: MULTISIG_ADDRESS,
  });
  const { showToast } = useToast();
  const { openModal, closeModal } = useModal();

  if (error) {
    showToast({ message: error.message, type: "error" });
    return;
  }

  if (!isLoading && !data) {
    showToast({ message: "Error while fetching", type: "error" });
    return;
  }

  const balanceToDisplay =
    isLoading || !data
      ? ""
      : `${formatEtherBalance(formatEther(data.value))} ${data.symbol}`;

  useEffect(() => {
    if (refetchBalance) {
      refetch();
      setRefetchBalance(false);
    }
  }, [refetchBalance]);

  return (
    <div className="flex flex-row justify-between items-center bg-bgSubtle w-content border border-border rounded px-4 py-2 shadow-xl">
      <div>
        <h2 className="text-xl">Contract Balance</h2>
        <h3 className="text-3xl mt-2">
          {isLoading ? <Skeleton height="h-10" /> : balanceToDisplay}
        </h3>
      </div>
      <Button
        onClick={() =>
          openModal(
            <AddFunds
              setRefetchBalance={setRefetchBalance}
              closeModal={closeModal}
            />
          )
        }
        className="w-32"
      >
        Add funds
      </Button>
    </div>
  );
}
