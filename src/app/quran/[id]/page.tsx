"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Container } from "@/components/container/container";
import { ApiRoutes } from "@/routes/routes";
import { IVerseResponse } from "@/interfaces";
import { versifier } from "@/lib/utils";

export default function Page() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verses, setVerses] = useState<string[]>([]);
  const [translation, setTranslation] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(`${ApiRoutes.Quran}/${id}`);
        if (!res.ok) throw new Error("Could not fetch Chapter");

        const data: IVerseResponse = await res.json();

        const { arabic, translation } = versifier(data.verses);

        setVerses(arabic);
        setTranslation(translation);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id]);

  return (
    <Container>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!isLoading && verses && (
        <div className="space-y-4">
          {verses.map((verse, index) => (
            <div
              className="text-2xl shadow-md p-4 rounded-md space-y-2"
              key={index}
            >
              <p className="quran-text">{verse}</p>
              <p className="text-base">{translation[index] ?? ""}</p>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
