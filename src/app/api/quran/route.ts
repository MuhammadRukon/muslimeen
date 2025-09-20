import { NextResponse } from "next/server";

import { IChapters } from "@/interfaces";
import { getToken } from "@/utils/token";

export async function GET() {
  try {
    const token = await getToken();
    const chapters = await getChapters(token);

    return NextResponse.json(chapters);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

async function getChapters(accessToken: string): Promise<IChapters[]> {
  const clientId = process.env.QURAN_CLIENT_ID!;

  const response = await fetch(
    `https://${process.env.QURAN_BASE_URL}/content/api/v4/chapters`,
    {
      headers: {
        "x-auth-token": accessToken,
        "x-client-id": clientId,
      },
      next: { revalidate: 3600 * 24 * 7 },
    }
  );

  if (!response.ok)
    throw new Error(`Chapters request failed: ${response.status}`);

  const data: { chapters: IChapters[] } = await response.json();

  return data.chapters;
}
