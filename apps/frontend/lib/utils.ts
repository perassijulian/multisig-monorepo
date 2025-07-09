import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

export function shortenAddress(input: string | undefined) {
  return input ? `${input.slice(0, 6)}...${input.slice(-4)}` : "";
}

// Accepts a balance in ETH (not wei), formats to 4 decimals
export function formatEtherBalance(balanceInEth: string | number) {
  const num =
    typeof balanceInEth === "string" ? parseFloat(balanceInEth) : balanceInEth;
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  }).format(num);
}
