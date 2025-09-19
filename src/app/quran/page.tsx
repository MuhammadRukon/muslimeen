"use client";

import { useEffect, useState } from "react";

import { Container } from "@/components/container/container";
import { IChapters } from "@/interfaces";

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
        const res = await fetch("/api/quran");

        if (!res.ok) throw new Error("Failed to fetch");

        const data: IChapters[] = await res.json();
        console.log(data, "data");

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
    <Container>
      <h1>Quran</h1>
      {state.loading ? (
        <p>Loading...</p>
      ) : (
        <p>
          {state.data.map((chapter) => (
            <span className="block" key={chapter.id}>
              {chapter.name_simple}
            </span>
          ))}
        </p>
      )}
    </Container>
  );
}
