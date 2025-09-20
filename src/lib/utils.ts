import { IVerse } from "@/interfaces";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function versifier(verses: IVerse[]) {
  const arabic: string[] = [];
  const translation: string[] = [];

  verses.forEach((v) => {
    let ar = "";
    let trans = "";
    v.words.forEach((w) => {
      ar += " " + w.text_uthmani;
      trans += " " + w.translation.text;
    });

    arabic.push(ar);
    translation.push(trans);
  });

  return { arabic, translation };
}
