import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

export function shortenAddress(input: string | undefined) {
  return input ? `${input.slice(0, 6)}...${input.slice(-4)}` : "";
}

export function formatBalance(balance: string | number) {
  const num = typeof balance === "string" ? parseFloat(balance) : balance;
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  }).format(num);
}
