import Link from "next/link";
import { Container } from "@/components/container/container";

import { BookOpen, Scroll } from "lucide-react";
export default function Home() {
  const cards = [
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

  return (
    <Container>
      <div className="flex items-center justify-center mt-[34px] min-h-[60vh] xl:min-h-[70vh] relative">
        <div
          style={{
            backgroundImage: `url(/banner.svg)`,
          }}
          className="absolute inset-0 bg-[length:95vw] sm:bg-[length:85vw] bg-transparent bg-no-repeat bg-center opacity-7 z-0"
        ></div>
        <div className="relative z-10 text-center mt-20">
          <div className="max-w-3xl">
            <h1 className="text-xl font-normal">
              O People! No Prophet or apostle will come after me and no new
              faith will be born. Reason well, therefore O People! and
              understand words that I convey to you. I leave behind me two
              things, the <strong>Quran</strong> and the
              <strong> &nbsp;Sunnah</strong> and if you follow these you will
              never go astray.
            </h1>

            <div className="p-8 pb-0">
              <div className="grid sm:grid-cols-2 gap-8">
                {cards.map(({ icon, ...card }) => (
                  <Home.Link key={card.href} {...card} icon={icon} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

Home.Link = ({
  href,
  title,
  description,
  linkText,
  color,
  icon,
}: {
  href: string;
  title: string;
  description: string;
  linkText: string;
  color: string;
  icon: React.ReactNode;
}) => {
  return (
    <Link href={href} className="group ">
      <div
        className={`bg-white/5 backdrop-blur-xs hover:scale-105 transition-all rounded-lg shadow-md hover:shadow-lg  duration-300 p-6 text-center border border-${color}-200 hover:border-${color}-300`}
      >
        <div className={`mx-auto mb-2 p-4 bg-${color}-100  rounded-full w-fit`}>
          {icon}
        </div>

        <h2
          className={`text-base md:text-xl font-bold text-${color}-800 mb-2 group-hover:text-${color}-600 transition-colors`}
        >
          {title}
        </h2>
        <p className="text-gray-700 text-xs md:text-sm leading-relaxed mb-4">
          {description}
        </p>
        <div
          className={`text-sm md:text-base text-${color}-600 font-semibold group-hover:text-${color}-500 transition-colors`}
        >
          {linkText}
        </div>
      </div>
    </Link>
  );
};
