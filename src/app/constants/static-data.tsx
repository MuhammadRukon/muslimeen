import { BookOpen, Scroll } from "lucide-react";

export const cardContent = [
  {
    href: "/quran",
    title: "Read Quran",
    description:
      "The Qur'an is the holy book of Islam, containing the words of Allah.",
    linkText: "Start Reading",
    color: "emerald",
    icon: (
      <BookOpen
        className={`h-8 w-8 group-hover:scale-125 transition-all duration-300 text-emerald-600`}
      />
    ),
  },

  {
    href: "https://hadithkhujo.netlify.app",
    title: "Read Hadith",
    description:
      "Hadith are the sayings, actions, and approvals of Prophet Muhammad (ﷺ).",
    linkText: "Explore Hadith",
    color: "amber",
    icon: (
      <Scroll
        className={`h-8 w-8 group-hover:scale-125 transition-all duration-300 text-amber-600`}
      />
    ),
  },
];
