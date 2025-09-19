import { IChapters } from "@/interfaces";
import { NextResponse } from "next/server";



interface IAccessToken {
  access_token: string;
  token_type: "bearer";
  expires_in: number;
  scope: string;
}

export async function GET() {
  try {
    const clientId = process.env.QURAN_CLIENT_ID!;
    const token = await getAccessToken();

    const chapters = await getChapters(token, clientId);

    return NextResponse.json(chapters);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

async function getAccessToken(): Promise<string> {
  const clientId = process.env.QURAN_CLIENT_ID!;
  const clientSecret = process.env.QURAN_CLIENT_SECRET!;

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(
    `https://${process.env.QURAN_AUTH_BASE_URL}/oauth2/token`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials&scope=content",
    }
  );

  if (!response.ok) throw new Error(`Token request failed: ${response.status}`);

  const data: IAccessToken = await response.json();

  if (!data.access_token) throw new Error("No access token received");

  return data.access_token;
}

async function getChapters(accessToken: string, clientId: string) {
  const response = await fetch(
    `https://${process.env.QURAN_BASE_URL}/content/api/v4/chapters`,
    {
      headers: {
        "x-auth-token": accessToken,
        "x-client-id": clientId,
      },
    }
  );

  if (!response.ok)
    throw new Error(`Chapters request failed: ${response.status}`);

  const data: { chapters: IChapters[] } = await response.json();

  return data.chapters;
}
