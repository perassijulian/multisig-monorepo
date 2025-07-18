"use client";

import AccountCard from "./AccountCard";
import { useEffect, useState } from "react";
import { getMultisigsFromUser } from "@/lib/flows/getMultisigs";
import { useToast } from "../context/ToastContext";
import { Multisig } from "@/types";
import { useAccount } from "wagmi";

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

  //TODO use skeleton
  if (isLoading) return <div>Loading..</div>;
  if (!isLoading && accounts.length === 0) {
    <div>You have no accounts yet. Create wallet first! </div>;
  }
  return (
    <div>
      {accounts.map((account) => (
        <AccountCard key={account.id} account={account} />
      ))}
    </div>
  );
}
