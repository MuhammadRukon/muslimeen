"use client";
import { Logo } from "../logo/logo";
import { Navbar } from "../navbar/navbar";

export function Header() {
  return (
    <div className="flex justify-between items-center px-2 sm:px-4 py-2 gap-2">
      <Logo />
      <Navbar />
      <div>user</div>
    </div>
  );
}
