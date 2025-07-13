import { shortenAddress } from "@/lib/utils";
import { EllipsisVertical } from "lucide-react";

export default function AccountCard({ account }: { account: any }) {
  const { name, contractAddr } = account;
  return (
    <div className="flex items-center justify-between p-4 mt-2 border border-border rounded-xl bg-bgSubtle hover:bg-bgMoreSubtle transition-colors shadow-xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full" />
        <div>
          <p className="text-text font-medium">{name}</p>
          <p className="text-sm text-textMuted">{`eth:${shortenAddress(
            contractAddr
          )}`}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs px-2 py-1 bg-red-500/10 text-red-500 rounded-md">
          Not activated
        </span>
        <EllipsisVertical size={18} className="text-textMuted cursor-pointer" />
      </div>
    </div>
  );
}
