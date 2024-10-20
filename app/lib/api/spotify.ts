import qs from 'querystring';

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const ARTIST_ENDPOINT = (id: string) => `https://api.spotify.com/v1/artists/${id}`
const TRACK_ENDPOINT = (id: string) => `https://api.spotify.com/v1/tracks/${id}`
const ALBUM_ENDPOINT = (id: string) => `https://api.spotify.com/v1/albums/${id}`

const basic = Buffer.from(
  `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
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
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
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
    cache: 'no-store',
  });
};

export const getAlbum = async (id: string): Promise<Response> => {
  const { access_token } = await getAccessToken();

  return fetch(ALBUM_ENDPOINT(id), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: 'no-store',
  });
};

export const getTrack = async (id: string): Promise<Response> => {
  const { access_token } = await getAccessToken();

  return fetch(TRACK_ENDPOINT(id), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: 'no-store',
  });
};