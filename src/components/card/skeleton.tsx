import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  children: React.ReactNode;
}

export function Skeleton({ className, children }: SkeletonProps) {
  return (
    <div
      className={cn(
        "bg-gray-200 p-4 animate-pulse duration-150 rounded-md",
        className
      )}
    >
      {children}
    </div>
  );
}
