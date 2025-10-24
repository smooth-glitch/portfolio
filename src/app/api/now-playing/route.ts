// app/api/now-playing/route.ts
import { NextResponse } from "next/server";

const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN,
} = process.env;

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

async function getAccessToken() {
  const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64");
  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: String(SPOTIFY_REFRESH_TOKEN),
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to refresh Spotify token");
  return res.json() as Promise<{ access_token: string }>;
}

async function getJSON(url: string, token: string) {
  const r = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  // 204 = no content (e.g., nothing playing)
  if (r.status === 204) return null;
  if (!r.ok) throw new Error(`Spotify request failed: ${r.status}`);
  return r.json();
}

export async function GET() {
  try {
    const { access_token } = await getAccessToken();

    // try now playing
    const now = await getJSON(NOW_PLAYING_ENDPOINT, access_token);
    if (now && now.item) {
      const item = now.item;
      const artists = item.artists?.map((a: any) => a.name).join(", ") || "";
      return NextResponse.json({
        isPlaying: now.is_playing === true,
        title: item.name,
        artist: artists,
        url: item.external_urls?.spotify ?? null,
        albumArt: item.album?.images?.[0]?.url ?? null,
      });
    }

    // fallback to recently played
    const recent = await getJSON(RECENTLY_PLAYED_ENDPOINT, access_token);
    const last = recent?.items?.[0]?.track;
    if (last) {
      const artists = last.artists?.map((a: any) => a.name).join(", ") || "";
      return NextResponse.json({
        isPlaying: false,
        title: last.name,
        artist: artists,
        url: last.external_urls?.spotify ?? null,
        albumArt: last.album?.images?.[0]?.url ?? null,
      });
    }

    return NextResponse.json({ isPlaying: false }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "spotify_unavailable" }, { status: 200 });
  }
}
