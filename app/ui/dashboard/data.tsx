'use client';

import React, { Suspense } from 'react';
import useSWR from 'swr';
import { MediaType, spotifyApiError, VideoInput } from '@/app/lib/types';
import {
  convertAlbumData,
  convertArtistData,
  convertTrackData,
  convertVideoData,
} from '@/app/lib/utils';
import { ResponseError } from '@/app/interfaces';
import { getYouTubeVideoId } from '@/app/lib/api/youtube';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export default function Data(props: { mediaType: MediaType | null }) {
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

  const videoId = getYouTubeVideoId(
    'https://youtu.be/FEkOYs6aWIg?si=xz0wH1UeAe3prB-r'
  );
  const {
    data: videoData,
    error: videoError,
    isLoading: videoIsLoading,
  } = useSWR<object, ResponseError>(
    () => `/api/youtube/video/${videoId}`,
    fetcher
  );

  let displayData;

  switch (mediaType) {
    case MediaType.Album:
      displayData = albumIsLoading
        ? { loading: true }
        : albumError ?? convertAlbumData(albumData);
      break;
    case MediaType.Artist:
      displayData = artistIsLoading
        ? { loading: true }
        : artistError ?? convertArtistData(artistData);
      break;
    case MediaType.Track:
      displayData = trackIsLoading
        ? { loading: true }
        : trackError ?? convertTrackData(trackData);
      break;
    case MediaType.Video:
      displayData = videoIsLoading
        ? { loading: true }
        : videoError ?? videoData !== undefined
        ? convertVideoData(videoData as VideoInput)
        : null;
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
