export async function fetchCustom(
  endpoint: string,
  accessToken: string
): Promise<Response> {
  const clientId = process.env.QURAN_CLIENT_ID!;

  const response = await fetch(
    `https://${process.env.QURAN_BASE_URL}/content/api/v4/${endpoint}`,
    {
      headers: {
        "x-auth-token": accessToken,
        "x-client-id": clientId,
      },
      next: { revalidate: 3600 * 24 * 7 },
    }
  );

  return response;
}
