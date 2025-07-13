import AccountList from "@/components/accounts/AccountList";
import Button from "@/components/UI/Button";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

export default function Welcome() {
  return (
    <section className="flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <div className="mt-8 flex flex justify-between items-center">
          <h2 className="font-bold text-3xl">Accounts</h2>
          <Link href={"/new-wallet/create"}>
            <Button>Create wallet</Button>
          </Link>
        </div>
        <div className="bg-bgSubtle w-full p-4 mt-10 rounded shadow-xl">
          <div className="flex justify-between gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full border border-border px-2 py-1 rounded text-sm bg-bg"
            />
            <button className="flex items-center gap-1 px-3 py-1 text-sm bg-muted rounded whitespace-nowrap">
              Sort by <ArrowUpDown className="w-4 h-4" />
            </button>
          </div>
          <div>
            <AccountList />
          </div>
        </div>
      </div>
    </section>
  );
}
