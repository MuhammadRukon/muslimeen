import { LinkCard } from "@/components/card/link-card";
import { Container } from "@/components/container/container";
import { Scroll } from "lucide-react";
import React from "react";
import { cardContent } from "../constants/static-data";

export default function page() {
  return (
    <Container>
      <div className="flex flex-col md:gap-6 gap-4 items-center justify-center mt-[34px] min-h-[60vh] xl:min-h-[70vh] relative">
        <h2 className=" md:text-xl text-lg font-normal text-center">
          Hadith page is under development. <br /> You can explore my previous
          work by clicking the buttons below.
        </h2>
        <div className="max-w-md">
          {cardContent.slice(-1).map((card) => (
            <LinkCard
              key={card.href}
              href={card.href}
              title={card.title}
              description={card.description}
              linkText={card.linkText}
              color={card.color}
              icon={card.icon}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
