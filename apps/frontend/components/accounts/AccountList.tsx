"use client";

import AccountCard from "./AccountCard";
import { useEffect, useState } from "react";
import { getMultisigsFromUser } from "@/lib/flows/getMultisigs";
import { useToast } from "../context/ToastContext";
import { Multisig } from "@/types";
import { useAccount } from "wagmi";
import Skeleton from "../UI/Skeleton";
import Link from "next/link";

export default function AccountList() {
  const { address } = useAccount();
  const { showToast } = useToast();
  const [accounts, setAccounts] = useState<Multisig[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMultisigs = async () => {
      if (isLoading && accounts.length === 0 && address) {
        const res: Multisig[] = await getMultisigsFromUser(address);
        if (!res) {
          showToast({
            message: "Error while fetching your accounts. Please try again",
            type: "error",
          });
        } else {
          setAccounts(res);
        }
        setIsLoading(false);
      }
    };
    fetchMultisigs();
  }, [address]);

  if (isLoading) {
    return (
      <div className="mt-4 space-y-2">
        <Skeleton className="h-6" />
        <Skeleton className="h-6" />
      </div>
    );
  }

  if (accounts.length === 0) {
    return (
      <div className="text-textMuted mt-2 flex items-center gap-2">
        You have no accounts yet.
        <Link
          href="/new-wallet/create"
          className="text-primary underline cursor-pointer"
        >
          Create wallet
        </Link>
      </div>
    );
  }

  return (
    <div>
      {accounts.map((account) => (
        <AccountCard key={account.id} account={account} />
      ))}
    </div>
  );
}
