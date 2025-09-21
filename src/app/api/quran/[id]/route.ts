import { NextResponse } from "next/server";

import { getToken } from "@/utils/token";
import { fetchCustom } from "@/utils/fetch-custom";

interface IParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: IParams) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const perPage = searchParams.get("per_page") || "10";

  try {
    const token = await getToken();
    const surah = await fetchByChapter(
      token,
      id,
      parseInt(page),
      parseInt(perPage)
    );

    return NextResponse.json(surah);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

async function fetchByChapter(
  accessToken: string,
  id: string,
  page: number = 1,
  perPage: number = 10
) {
  const chapterInfoRes = await fetchCustom(`chapters/${id}`, accessToken);

  if (!chapterInfoRes.ok)
    throw new Error(`Chapter request failed: ${chapterInfoRes.status}`);

  const chapterRes = await fetchCustom(
    `verses/by_chapter/${id}?words=true&word_fields=text_uthmani&page=${page}&per_page=${perPage}`,
    accessToken
  );

  if (!chapterRes.ok)
    throw new Error(`Verses request failed: ${chapterRes.status}`);

  const chapterInfoData = await chapterInfoRes.json();
  const chapterData = await chapterRes.json();

  return { ...chapterData, chapter: chapterInfoData.chapter };
}
