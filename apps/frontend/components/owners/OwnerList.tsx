"use client";

import { useReadMultisigContract } from "@/lib/hooks/useMultisigContract";
import { shortenAddress } from "@/lib/utils";

export default function OwnerList() {
  const { data, error, isLoading } = useReadMultisigContract({
    functionName: "getOwners",
  });

  // TODO add skeleton
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (!Array.isArray(data)) return null;

  return (
    <div className="overflow-x-auto rounded border border-border shadow-sm">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-bgSubtle text-text">
          <tr>
            <th className="px-4 py-2 font-medium text-gray-600">#</th>
            <th className="px-4 py-2 font-medium text-gray-600">
              Owners Addresses
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((owner, i) => (
            <tr key={owner} className="hover:opacity-50">
              <th className="py-2 px-4 text-gray-500">{i + 1}</th>
              <th className="py-2 px-4 font-mono">{shortenAddress(owner)}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
