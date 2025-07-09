"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

export default function AssetsNavbar({ wallets }: { wallets: string[] }) {
  const [selected, setSelected] = useState<number>(0);

  return (
    <nav className="h-32 w-full p-6 bg-bgSubtle border-b border-border">
      <h2 className="text-text text-2xl font-bold">Assets</h2>
      <ul className="flex gap-6">
        {wallets.map((wallet, i) => (
          <li
            onClick={() => setSelected(i)}
            className={cn(
              "cursor-pointer p-6 hover:text-primary transition-colors duration-300",
              selected === i ? "border-b-4 border-primary text-primary" : ""
            )}
            key={i}
          >
            {wallet}
          </li>
        ))}
      </ul>
    </nav>
  );
}
