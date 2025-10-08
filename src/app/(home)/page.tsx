import { LinkCard } from "@/components/card/link-card";
import { cardContent } from "../constants/static-data";
export default function Home() {
  return (
    <div className="flex items-center justify-center mt-[34px] min-h-[60vh] xl:min-h-[70vh] relative">
      <div
        style={{
          backgroundImage: `url(/banner.svg)`,
        }}
        className="absolute inset-0 bg-[length:85vw] sm:bg-[length:85vw] bg-transparent bg-no-repeat bg-center opacity-7 z-0"
      ></div>
      <div className="relative z-10 text-center mt-20 px-4">
        <div className="max-w-3xl">
          <h1 className="text-xl font-normal">
            O People! No Prophet or apostle will come after me and no new faith
            will be born. Reason well, therefore O People! and understand words
            that I convey to you. I leave behind me two things, the{" "}
            <strong>Quran</strong> and the
            <strong> &nbsp;Sunnah</strong> and if you follow these you will
            never go astray.
          </h1>

          <div className="p-8 pb-0">
            <div className="grid sm:grid-cols-2 gap-8">
              {cardContent.map(({ icon, ...card }) => (
                <LinkCard key={card.href} {...card} icon={icon} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
