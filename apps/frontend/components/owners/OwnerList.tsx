"use client";

import { useEffect } from "react";
import { useReadMultisigContract } from "@/lib/hooks/useMultisigContract";
import { shortenAddress } from "@/lib/utils";
import Table from "../UI/Table";
import { useToast } from "../context/ToastContext";

const TABLE_HEAD = ["#", "Owners Addressess"];

export default function OwnerList() {
  const { showToast } = useToast();
  const { data, error, isLoading } = useReadMultisigContract({
    functionName: "getOwners",
  });

  useEffect(() => {
    if (error) {
      showToast({
        message: "Something went wrong. Please refresh your browser",
        type: "error",
      });
      console.error(error);
    }
  }, [error, showToast]);

  if (isLoading) return <Table isLoading head={TABLE_HEAD} />;

  const owners = data as `0x${string}`[] | undefined;

  if (!Array.isArray(owners) || owners.length === 0 || error) {
    return <Table head={TABLE_HEAD} />;
  }

  const body = owners.map((address, i) => [i + 1, shortenAddress(address)]);

  return <Table head={["#", "Owners Addressess"]} body={body} />;
}
