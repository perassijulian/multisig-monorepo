"use client";

import { useReadMultisigContract } from "@/lib/hooks/useMultisigContract";
import { shortenAddress } from "@/lib/utils";
import Table from "../UI/Table";

export default function OwnerList() {
  const { data, error, isLoading } = useReadMultisigContract({
    functionName: "getOwners",
  });

  // TODO add skeleton
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (!Array.isArray(data)) return null;

  const body = data.map((item, i) => [i + 1, shortenAddress(item)]);

  return <Table head={["#", "Owners Addressess"]} body={body} />;
}
