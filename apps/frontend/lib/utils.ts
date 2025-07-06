import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

export function shortenAddress(input: string | undefined) {
  return input ? `${input.slice(0, 6)}...${input.slice(-4)}` : "";
}
