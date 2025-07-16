import { Pencil, Trash2 } from "lucide-react";

export default function ContactActions() {
  return (
    // TODO ADD FUNCTIONALITY
    <div className="flex items-center justify-end gap-4">
      <Pencil className="cursor-pointer" size={20} />
      <Trash2 className="text-red-500 cursor-pointer" size={20} />
      <button className="bg-bgSubtle py-1 px-4 rounded">Send</button>
    </div>
  );
}
