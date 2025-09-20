"use client";

import { useEffect, useState } from "react";

import { Container } from "@/components/container/container";
import { IChapters } from "@/interfaces";
import { Card } from "@/components/card/card";
import { ApiRoutes } from "@/routes/routes";

interface IState {
  data: IChapters[];
  error: any;
  loading: boolean;
}

export default function page() {
  const [state, setState] = useState<IState>({
    data: [],
    error: null,
    loading: false,
  });

  useEffect(() => {
    async function fetchData() {
      setState((prev) => ({ ...prev, loading: true }));

      try {
        const res = await fetch(ApiRoutes.Quran);

        if (!res.ok) throw new Error("Failed to fetch");

        const data: IChapters[] = await res.json();

        setState((prev) => ({ ...prev, data: data }));
      } catch (err) {
        console.error(err);
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    }

    fetchData();
  }, []);

  return (
    <Container className="text-center">
      <h1>All Surah</h1>
      {state.loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 my-4">
          {state.data.map((chapter, index) => (
            <Card
              key={chapter.id}
              href={`/quran/${chapter.id}`}
              className="grid grid-cols-3 text-sm justify-between"
            >
              <p className=" text-gray-500">{index + 1}</p>
              <p className="text-nowrap">
                {chapter.name_simple + " "}
                <span className=" text-gray-500">({chapter.verses_count})</span>
              </p>
              <p>{chapter.name_arabic}</p>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}
