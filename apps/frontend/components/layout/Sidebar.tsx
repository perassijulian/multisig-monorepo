"use client";

import {
  ArrowUpDown,
  BookOpenText,
  ChartCandlestick,
  Home,
  Settings,
} from "lucide-react";
import Button from "../UI/Button";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useConfig } from "wagmi";

export default function Sidebar() {
  const pathname = usePathname();
  const config = useConfig();

  const searchParams = useSearchParams();
  const walletParam = searchParams.get("wallet");
  const safeQuery = walletParam ? `?wallet=${walletParam}` : "";

  const onClick = () => {
    // TODO define action
    console.log("holi");
  };

  const navigationItems = [
    { icon: <Home />, text: "Home", href: `/home${safeQuery}` },
    { icon: <ChartCandlestick />, text: "Assets", href: `/assets${safeQuery}` },
    {
      icon: <ArrowUpDown />,
      text: "Transations",
      href: `/transactions${safeQuery}`,
    },
    {
      icon: <BookOpenText />,
      text: "Address book",
      href: `/address-book${safeQuery}`,
    },
    { icon: <Settings />, text: "Settings", href: `/settings${safeQuery}` },
  ];

  return (
    <nav className="bg-bgSubtle space-y-2 h-screen w-64 shrink-0 border-r border-border">
      <div className="bg-secondary w-full flex justify-center text-sm">
        {config.chains[0].name ?? "Not detected"}
      </div>
      <div className="px-2">
        <div>account info</div>
        <Button onClick={onClick}>Activate now</Button>
        <ul>
          {navigationItems.map((item, i) => (
            <li key={i}>
              <Link
                className={cn(
                  "flex gap-4 px-4 py-2 my-1 rounded hover:bg-white/10 transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring",
                  pathname === item.href ? "bg-bgMoreSubtle" : ""
                )}
                href={item.href}
              >
                {item.icon}
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
        <div>extras</div>
      </div>
    </nav>
  );
}
