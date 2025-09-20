"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";

import { IChapters, IVerseResponse } from "@/interfaces";
import { ApiRoutes } from "@/routes/routes";
import { versifier } from "@/lib/utils";

import { Container } from "@/components/container/container";

export default function Page() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [header, setHeader] = useState<IChapters | null>(null);
  const [verses, setVerses] = useState<string[]>([]);
  const [translation, setTranslation] = useState<string[]>([]);

  const [pagination, setPagination] = useState<{
    currentPage: number;
    hasNextPage: boolean;
    nextPage: number | null;
    totalPages: number;
  }>({
    currentPage: 1,
    hasNextPage: false,
    nextPage: null,
    totalPages: 1,
  });

  const observerRef = useRef<HTMLDivElement>(null);

  const fetchData = useCallback(
    async (page: number, isLoadMore: boolean = false) => {
      setIsLoading(isLoadMore);
      setError(null);

      try {
        const res = await fetch(
          `${ApiRoutes.Quran}/${id}?page=${page}&per_page=10`
        );
        if (!res.ok) throw new Error("Could not fetch Chapter");

        const data: IVerseResponse = await res.json();

        setHeader(data.chapter);

        const { arabic, translation: newTranslation } = versifier(data.verses);

        if (pagination.currentPage === data.pagination.current_page) {
          setVerses(arabic);
          setTranslation(newTranslation);
        } else {
          setVerses((prev) => [...prev, ...arabic]);
          setTranslation((prev) => [...prev, ...newTranslation]);
        }

        setPagination((prev) => ({
          ...prev,
          currentPage: data.pagination.current_page,
          totalPages: data.pagination.total_pages,
          nextPage: data.pagination.next_page,
          hasNextPage: data.pagination.next_page !== null,
        }));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchData(pagination.currentPage, true);
  }, []);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchData(pagination.nextPage!);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [pagination.nextPage]);

  return (
    <Container>
      {isLoading && <div className="text-center py-8">Loading...</div>}
      {error && <div className="text-red-500 text-center py-4">{error}</div>}
      {!isLoading && verses && (
        <div className="space-y-4">
          {header && (
            <>
              <div className="text-center py-4">
                <p className="text-4xl quran-text">{header.name_arabic}</p>
                <h2 className="text-lg">{header.name_simple}</h2>
                <p className="text-sm">{header.translated_name.name}</p>
              </div>
              <div className="quran-text text-2xl text-center">
                بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
              </div>
            </>
          )}
          {verses.map((verse, index) => (
            <div
              className="text-2xl shadow-md p-4 rounded-md space-y-2"
              key={index}
            >
              <p className="quran-text text-right">{verse}</p>
              <p className="text-base">{translation[index] ?? ""}</p>
            </div>
          ))}

          {pagination.hasNextPage && (
            <div ref={observerRef} className="text-center py-4">
              <div className="bg-gray-200 p-4 animate-pulse duration-150 rounded-md min-h-24">
                <div className="ml-auto h-8 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-300 rounded w-1/2 mb-2"></div>
              </div>
            </div>
          )}

          {!pagination.hasNextPage && verses.length > 0 && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm mt-2">
                Page {pagination.currentPage} of {pagination.totalPages}
              </p>
            </div>
          )}
        </div>
      )}
    </Container>
  );
}
