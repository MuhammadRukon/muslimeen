import { NextResponse } from "next/server";

import { IChapters } from "@/interfaces";
import { getToken } from "@/utils/token";
import { fetchCustom } from "@/utils/fetch-custom";

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
  const response = await fetchCustom("chapters", accessToken);

  if (!response.ok)
    throw new Error(`Chapters request failed: ${response.status}`);

  const data: { chapters: IChapters[] } = await response.json();

  return data.chapters;
}
