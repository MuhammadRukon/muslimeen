interface IAccessToken {
  access_token: string;
  token_type: "bearer";
  expires_in: number;
  scope: string;
}

let cachedToken: { token: string; expiresAt: number } = {
  token: "",
  expiresAt: 0,
};

export async function getAccessToken(): Promise<{
  token: string;
  expiresAt: number;
}> {
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
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) throw new Error(`Token request failed: ${response.status}`);

  const data: IAccessToken = await response.json();

  if (!data.access_token) throw new Error("No access token received");
  const now = Date.now();

  return {
    token: data.access_token,
    expiresAt: now + (data.expires_in - 30) * 1000,
  };
}

export async function getToken(): Promise<string> {
  const now = Date.now();

  //TODO: THIS NEEDS TO BE FIXED
  // if (cachedToken.expiresAt > now) {
  //   return cachedToken.token;
  // }

  const { token, expiresAt } = await getAccessToken();

  cachedToken = {
    token,
    expiresAt,
  };

  return token;
}
