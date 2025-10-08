"use client";
import { Logo } from "../logo/logo";
import { Navbar } from "../navbar/navbar";

export function Header() {
  return (
    <div className="flex justify-between items-center px-2 sm:px-4 py-2 gap-2">
      <Logo />
      <Navbar />
      <div className="rounded-full bg-muted border p-2 text-muted-foreground">
        user
      </div>
    </div>
  );
}
