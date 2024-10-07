import { getAlbum, getArtist, getTrack } from "./api/spotify";
import { spotifyApiError } from "./types";
import { convertAlbumData, convertArtistData, convertTrackData } from "./utils";

export async function loadArtist(id: string): Promise<object | spotifyApiError> {
  try {
    const response = await getArtist(id)

    const data = await response.json()

    if (response.status !== 200) {
      throw data.error
    }

    return data
  } catch (error) {
    console.error('~ Fetch artist failed:', error);
    return error as spotifyApiError;
  }
}

export async function loadAlbum(id: string): Promise<object | spotifyApiError> {
  try {
    const response = await getAlbum(id)

    const data = await response.json()

    if (response.status !== 200) {
      throw data.error
    }

    return data
  } catch (error) {
    console.error('~ Fetch album failed:', error);
    return error as spotifyApiError;
  }
}

export async function loadTrack(id: string): Promise<object | spotifyApiError> {
  try {
    const response = await getTrack(id)

    const data = await response.json()

    if (response.status !== 200) {
      throw data.error
    }

    return data
  } catch (error) {
    console.error('~ Fetch track failed:', error);
    return error as spotifyApiError;
  }
}

export async function loadSpotifyData() {
  const artistApiData = await loadArtist('7tr9pbgNEKtG0GQTKe08Tz')
  const artistData = convertArtistData(artistApiData)

  const albumApiData = await loadAlbum('6DlLdXBGCsSDPOV8R2pCl7')
  const albumData = convertAlbumData(albumApiData)

  const trackApiData = await loadTrack('23uLia0r9XqAIKrj0Rlc4D')
  const trackData = convertTrackData(trackApiData)

  return {
    artistData,
    albumData,
    trackData,
  }
}

