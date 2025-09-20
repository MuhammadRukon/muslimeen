import { NextResponse } from "next/server";
import { getToken } from "@/utils/token";

interface IParams {
  params: Promise<{ id: string }>;
}

export async function GET(_: Request, { params }: IParams) {
  const { id } = await params;

  try {
    const token = await getToken();
    const surah = await fetchByChapter(token, id);

    return NextResponse.json(surah);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

async function fetchByChapter(accessToken: string, id: string) {
  const clientId = process.env.QURAN_CLIENT_ID!;
  const chapter = await fetch(
    `https://${process.env.QURAN_BASE_URL}/content/api/v4/chapters/${id}`,
    {
      headers: {
        "x-auth-token": accessToken,
        "x-client-id": clientId,
      },
    }
  );

  if (!chapter.ok) throw new Error(`Chapter request failed: ${chapter.status}`);

  const response = await fetch(
    `https://${process.env.QURAN_BASE_URL}/content/api/v4/verses/by_chapter/${id}?words=true&word_fields=text_uthmani`,
    {
      headers: {
        "x-auth-token": accessToken,
        "x-client-id": clientId,
      },
    }
  );

  if (!response.ok) throw new Error(`Token request failed: ${response.status}`);

  const chapterData = await chapter.json();
  const data = await response.json();

  return { ...data, chapter: chapterData.chapter };
}
