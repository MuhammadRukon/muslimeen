import Link from "next/link";

export function Card({
  children,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="border border-gray-100 shadow-md p-2 rounded-md">
      <Link {...props}>{children}</Link>
    </div>
  );
}
