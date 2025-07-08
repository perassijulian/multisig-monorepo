import { Check, X } from "lucide-react";

export default function TransactionActions() {
  return (
    <div className="flex gap-2 items-center justify-center">
      <Check className="cursor-pointer text-green-500 transition-all duration-150 ease-in-out hover:text-green-400 hover:drop-shadow-glowGreen hover:scale-110" />
      <X className="cursor-pointer text-red-500 transition-all duration-150 ease-in-out hover:text-red-400 hover:drop-shadow-glowRed hover:scale-110" />
    </div>
  );
}
