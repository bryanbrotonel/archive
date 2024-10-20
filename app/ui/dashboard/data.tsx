'use client';

import React, { Suspense } from 'react';
import useSWR from 'swr';
import { spotifyApiError } from '@/app/lib/types';
import {
  convertAlbumData,
  convertArtistData,
  convertTrackData,
} from '@/app/lib/utils';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export default function Data(props: { mediaType: string | null }) {
  const { mediaType } = props;

  const trackId = '23uLia0r9XqAIKrj0Rlc4D';
  const {
    data: trackData,
    error: trackError,
    isLoading: trackIsLoading,
  } = useSWR<object, spotifyApiError>(
    () => `/api/spotify/track/${trackId}`,
    fetcher
  );

  const albumId = '6DlLdXBGCsSDPOV8R2pCl7';
  const {
    data: albumData,
    error: albumError,
    isLoading: albumIsLoading,
  } = useSWR<object, spotifyApiError>(
    () => `/api/spotify/album/${albumId}`,
    fetcher
  );

  const artistId = '7tr9pbgNEKtG0GQTKe08Tz';
  const {
    data: artistData,
    error: artistError,
    isLoading: artistIsLoading,
  } = useSWR<object, spotifyApiError>(
    () => `/api/spotify/artist/${artistId}`,
    fetcher
  );

  let displayData;

  switch (mediaType) {
    case 'album':
      displayData = albumIsLoading
        ? { loading: true }
        : albumError ?? convertAlbumData(albumData);
      break;
    case 'artist':
      displayData = artistIsLoading
        ? { loading: true }
        : artistError ?? convertArtistData(artistData);
      break;
    case 'track':
      displayData = trackIsLoading
        ? { loading: true }
        : trackError ?? convertTrackData(trackData);
      break;
    default:
      if (albumIsLoading && artistIsLoading && trackIsLoading) {
        displayData = {};
      } else {
        if (albumError && artistError && trackError) {
          displayData = {
            albumError,
            artistError,
            trackError,
          };
        } else {
          displayData = {
            albumData: albumData ? convertAlbumData(albumData) : {},
            artistData: artistData ? convertArtistData(artistData) : {},
            trackData: trackData ? convertTrackData(trackData) : {},
          };
        }
      }
      break;
  }

  return (
    <div>
      <p>{mediaType}</p>
      <Suspense fallback={<p>loading...</p>}>
        <pre>{JSON.stringify(displayData, null, 2)}</pre>
      </Suspense>
    </div>
  );
}
