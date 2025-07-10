import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
}

export default function Skeleton({
  className,
  width = "w-full",
  height = "h-4",
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "rounded bg-gradient-to-r from-skeletonBase via-skeletonHighlight to-skeletonBase bg-[length:200%_100%] animate-shimmer",
        width,
        height,
        className
      )}
      {...props}
    />
  );
}
