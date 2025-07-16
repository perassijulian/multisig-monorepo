import { ArrowDownToLine, ArrowUpToLine, Search, UserPlus } from "lucide-react";

export default function AddressBookNavbar() {
  return (
    <nav className="h-32 w-full p-6 bg-bgSubtle border-b border-border">
      <h2 className="text-text text-2xl font-bold">Address books</h2>
      <div className="flex justify-between w-full pl-6 pr-24 mt-6">
        <div className="relative w-96">
          <Search className="absolute left-3 top-2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-1 rounded border border-border bg-bg text-text placeholder-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all"
          />
        </div>
        <div className="flex gap-4">
          <button className="text-primary flex items-center justify-center gap-1 py-1 px-4 hover:bg-white/10 cursor-pointer rounded transition">
            <ArrowDownToLine size={20} />
            Import
          </button>
          <button className="text-primary flex items-center justify-center gap-1 py-1 px-4 hover:bg-white/10 cursor-pointer rounded transition">
            <ArrowUpToLine size={20} />
            Export
          </button>
          <button className="text-primary flex items-center justify-center gap-1 py-1 px-4 hover:bg-white/10 cursor-pointer rounded transition">
            <UserPlus size={20} /> Create entry
          </button>
        </div>
      </div>
    </nav>
  );
}
