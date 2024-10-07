import qs from 'querystring';

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const ARTIST_ENDPOINT = (id: string) => `https://api.spotify.com/v1/artists/${id}`
const TRACK_ENDPOINT = (id: string) => `https://api.spotify.com/v1/tracks/${id}`
const ALBUM_ENDPOINT = (id: string) => `https://api.spotify.com/v1/albums/${id}`

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } =
  process.env;

const basic = Buffer.from(
  `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`,
).toString('base64');

export const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
    cache: 'no-store',
  });

  return response.json();
};

export const getArtist = async (id: string): Promise<Response> => {
  const { access_token } = await getAccessToken();

  return fetch(ARTIST_ENDPOINT(id), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getAlbum = async (id: string): Promise<Response> => {
  const { access_token } = await getAccessToken();

  return fetch(ALBUM_ENDPOINT(id), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getTrack = async (id: string): Promise<Response> => {
  const { access_token } = await getAccessToken();

  return fetch(TRACK_ENDPOINT(id), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};