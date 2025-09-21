import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/">
      <Image height={30} width={30} quality={100} src="/logo.png" alt="logo" />
    </Link>
  );
}
