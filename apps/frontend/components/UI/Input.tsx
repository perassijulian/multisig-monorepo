import { cn } from "@/lib/utils";

interface InputProps {
  label: string;
  name: string;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  className?: string;
  keyTag?: number;
}

export default function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  className = "",
  keyTag = 0,
}: InputProps) {
  return (
    <div key={keyTag}>
      <label
        htmlFor={name}
        className="mt-2 mb-1 block text-sm font-medium text-textMuted"
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        required={required}
        className={cn(
          "text-black w-full rounded px-2 py-1 border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className
        )}
      />
    </div>
  );
}
