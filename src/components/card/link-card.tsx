import Link from "next/link";
import React from "react";

interface LinkCardProps {
  href: string;
  title: string;
  description: string;
  linkText: string;
  color: string;
  icon: React.ReactNode;
}
export const LinkCard = ({
  href,
  title,
  description,
  linkText,
  icon,
}: LinkCardProps) => {
  let color = "emerald";
  if (href.includes("http")) {
    color = "amber";
  } else {
    color = "emerald";
  }
  return (
    <Link href={href} className="group ">
      <div
        className={`bg-white/5 backdrop-blur-xs hover:scale-105 transition-all rounded-lg shadow-md hover:shadow-lg  duration-300 p-6 text-center border ${
          color === "emerald"
            ? "border-emerald-200 hover:border-emerald-300"
            : "border-amber-200 hover:border-amber-300"
        }`}
      >
        <div
          className={`mx-auto mb-2 p-4 ${
            color === "emerald" ? "bg-emerald-100" : "bg-amber-100"
          }  rounded-full w-fit`}
        >
          {icon}
        </div>

        <h2
          className={`text-base md:text-xl font-bold ${
            color === "emerald"
              ? "text-emerald-800 group-hover:text-emerald-600"
              : "text-amber-800 group-hover:text-amber-600"
          } mb-2 transition-colors`}
        >
          {title}
        </h2>
        <p className="text-gray-700 text-xs md:text-sm leading-relaxed mb-4">
          {description}
        </p>
        <div
          className={`text-sm md:text-base ${
            color === "emerald"
              ? "text-emerald-600 group-hover:text-emerald-500"
              : "text-amber-600 group-hover:text-amber-500"
          } font-semibold  transition-colors`}
        >
          {linkText}
        </div>
      </div>
    </Link>
  );
};
