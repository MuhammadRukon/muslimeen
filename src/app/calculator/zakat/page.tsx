import { Container } from "@/components/container/container";
import { ZakatCalculator } from "@/components/zakat-calculator/zakat-calculator";
import { GOLD_NISAAB, SILVER_NISAAB } from "@/app/constants/static-data";

export default function page() {
  return (
    <Container>
      <div className="mt-3 md:mt-6 flex flex-col gap-6 items-center">
        <div className="flex flex-col gap-1 text-2xl md:text-3xl text-center">
          <p className="quran-text ">
            وَأَقِيمُواْ ٱلصَّلَوٰةَ وَءَاتُواْ ٱلزَّكَوٰةَ وَٱرۡكَعُواْ مَعَ
            ٱلرَّـٰكِعِينَ
          </p>
          <p className="text-sm md:text-base text-muted-foreground">
            Wa aqeemus salaata wa aatuz zakaata warka'oo ma'ar raaki'een
          </p>
          <p className="text-sm md:text-base">
            And establish prayer and give zakah and bow with those who bow [in
            worship and obedience]. (Quran 2:43)
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-lg md:text-xl font-semibold text-center">
            Some Popular Hadiths on Zakat:
          </h2>
          <ul className="text-center space-y-1">
            <li>
              The wealth of a person does not decrease by paying Zakat (Sahih
              Bukhari)
            </li>
            <li>
              One who pays Zakat, Allah will make their wealth increase (Sahih
              Bukhari)
            </li>
            <li>
              On gold/silver: There is no zakat on less than five awaq of
              silver. (Sahih Muslim, Book of Zakat)
            </li>
            <li>
              On crops: On that which is watered by rain, the due is one-tenth,
              and on that which is irrigated, one-twentieth. (Sahih al-Bukhari,
              Book of Zakat)
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-lg md:text-xl font-normal text-center">
            Nisaab - The minimum threshold of wealth a Muslim must have before
            zakat (2.5% of the wealth) becomes obligatory:
          </h2>
          <ul className="text-center space-y-1">
            <li>
              <strong>{GOLD_NISAAB}g</strong> equivalent of{" "}
              <strong>gold</strong>
              &nbsp;or&nbsp;
              <strong>{SILVER_NISAAB}g</strong> equivalent of{" "}
              <strong>&nbsp;silver</strong>.
            </li>
          </ul>
        </div>
        <ZakatCalculator />
      </div>
    </Container>
  );
}
