"use client";

import { useAccount } from "wagmi";
import AccountCard from "./AccountCard";
import { useEffect, useState } from "react";
import { getMultisigsFromUser } from "@/lib/flows/getMultisigs";
import { useToast } from "../context/ToastContext";

export default function AccountList() {
  const { address } = useAccount();
  const { showToast } = useToast();
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMultisigs = async () => {
      if (isLoading && accounts.length === 0 && address) {
        // TODO define type of res
        const res = await getMultisigsFromUser(address);
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
  return (
    <div>
      {accounts.map((account) => (
        <AccountCard account={account} />
      ))}
    </div>
  );
}
