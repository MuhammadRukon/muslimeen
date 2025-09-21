import Link from "next/link";

interface CardProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, ...props }: CardProps) {
  return (
    <div className="border border-gray-100 shadow-md p-2 rounded-md">
      <Link {...props}>{children}</Link>
    </div>
  );
}
