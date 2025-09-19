import React from "react";
import { Navbar } from "../navbar/navbar";

export function Header() {
  return (
    <div className="flex justify-between items-center px-2 sm:px-4 py-2 gap-2">
      <p className="text-2xl">IQRA</p>
      <Navbar />
      <div>user</div>
    </div>
  );
}
