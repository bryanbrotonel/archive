'use client';

import React from 'react';
import useSWR from 'swr';
import { MediaType, VideoInput } from '@/app/lib/types';
import {
  convertAlbumData,
  convertArtistData,
  convertTrackData,
  convertVideoData,
} from '@/app/lib/utils';
import { getYouTubeVideoId } from '@/app/lib/api/youtube';
import MeidaPreview from './mediaPreview';
import { Album, Artist, Track } from '@spotify/web-api-ts-sdk';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.error.message);
  }
  return data;
};

export default function Data(props: { mediaType: MediaType | null }) {
  const { mediaType } = props;
  let mediaContent;

  const trackId = '63ABAnFKJCp28TAyqf2cGL';
  const {
    data: trackData,
    error: trackError,
    isLoading: trackIsLoading,
  } = useSWR<Track, Error>(
    () =>
      mediaType === MediaType.Track ? `/api/spotify/track/${trackId}` : null,
    fetcher
  );

  const albumId = '6DlLdXBGCsSDPOV8R2pCl7';
  const {
    data: albumData,
    error: albumError,
    isLoading: albumIsLoading,
  } = useSWR<Album, Error>(
    () =>
      mediaType === MediaType.Album ? `/api/spotify/album/${albumId}` : null,
    fetcher
  );

  const artistId = '7tr9pbgNEKtG0GQTKe08Tz';
  const {
    data: artistData,
    error: artistError,
    isLoading: artistIsLoading,
  } = useSWR<Artist, Error>(
    () =>
      mediaType === MediaType.Artist ? `/api/spotify/artist/${artistId}` : null,
    fetcher
  );

  const videoId = getYouTubeVideoId(
    'https://youtu.be/FEkOYs6adWIg?si=xz0wH1UeAe3prB-r'
  );
  const {
    data: videoData,
    error: videoError,
    isLoading: videoIsLoading,
  } = useSWR<object>(
    () =>
      mediaType === MediaType.Video ? `/api/youtube/video/${videoId}` : null,
    fetcher
  );

  switch (mediaType) {
    case MediaType.Album:
      if (albumError) mediaContent = <div>{albumError.message}</div>;
      else if (albumIsLoading) mediaContent = <div>Album Loading...</div>;
      else if (!albumData) mediaContent = <div>No album...</div>;
      else {
        const { name, artists, externalUrl, images } =
          convertAlbumData(albumData);

        mediaContent = (
          <MeidaPreview
            title={name}
            subTitle={artists.map((artist) => artist.name).join(', ')}
            imageUrl={images[0].url ?? ''}
            externalUrl={externalUrl}
          />
        );
      }
      break;
    case MediaType.Artist:
      if (artistError) mediaContent = <div>{artistError.message}</div>;
      else if (artistIsLoading) mediaContent = <div>Artist Loading...</div>;
      else if (!artistData) mediaContent = <div>No artist...</div>;
      else {
        const { name, externalUrl, images } = convertArtistData(artistData);

        mediaContent = (
          <MeidaPreview
            title={name}
            imageUrl={images[0].url ?? ''}
            externalUrl={externalUrl}
          />
        );
      }
      break;
    case MediaType.Track:
      if (trackError) mediaContent = <div>{trackError.message}</div>;
      else if (trackIsLoading) mediaContent = <div>Track Loading...</div>;
      else if (!trackData) mediaContent = <div>No track...</div>;
      else {
        const { name, album, artists, externalUrl } =
          convertTrackData(trackData);

        mediaContent = (
          <MeidaPreview
            title={name}
            subTitle={artists.map((artist) => artist.name).join(', ')}
            imageUrl={album.images[0].url ?? ''}
            externalUrl={externalUrl}
          />
        );
      }
      break;
    case MediaType.Video:
      if (videoError) mediaContent = <div>{videoError.message}</div>;
      else if (videoIsLoading) mediaContent = <div>Video Loading...</div>;
      else if (!videoData || Object.keys(videoData).length === 0)
        mediaContent = <div>No video...</div>;
      else {
        const { title, channelTitle, thumbnailUrl, videoUrl } =
          convertVideoData(videoData as VideoInput);

        mediaContent = (
          <MeidaPreview
            title={title}
            subTitle={channelTitle}
            imageUrl={thumbnailUrl}
            externalUrl={videoUrl}
          />
        );
      }
      break;
    default:
      mediaContent = <div>No media type selected</div>;
      break;
  }

  return (
    <div className='mt-5'>
      <div>{mediaContent}</div>
    </div>
  );
}
