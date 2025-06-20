import { ConvertedVideo, MediaType } from '@/app/lib/types';
import { Album, Artist, Track } from '@spotify/web-api-ts-sdk';
import { handleRefresh } from '../previewList/api';

export const onSaveVideo = async (convertedData: ConvertedVideo) => {
  const {
    id,
    title,
    channelId,
    channelTitle,
    thumbnailUrl,
    videoUrl,
    publishedAt,
  } = convertedData;

  const saveData = {
    videoID: id,
    videoTitle: title,
    channelID: channelId,
    channelTitle: channelTitle,
    thumbnailUrl: thumbnailUrl,
    external_urls: { youtube: videoUrl },
    publishedAt: publishedAt,
  };

  try {
    const response = await fetch(`/api/database/addVideo`, {
      method: 'POST',
      body: JSON.stringify(saveData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to save video');
    }

    handleRefresh(MediaType.Video);
  } catch (error) {
    console.error('Error saving video:', error);
  }
};

export const onSaveTrack = async (data: Track) => {
  const saveData = {
    id: data?.id,
    name: data?.name,
    artist: data.artists.map((artist) => artist.name).join(', '),
    trackNumber: data?.track_number,
    previewUrl: data?.preview_url,
    externalUrls: { spotify: data?.external_urls.spotify },
    imageUrl: data?.album.images[0].url,
  };

  try {
    const response = await fetch(`/api/database/addTrack`, {
      method: 'POST',
      body: JSON.stringify(saveData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to save track');
    }

    handleRefresh(MediaType.Track);
  } catch (error) {
    console.error('Error saving track:', error);
  }
};

export const onSaveArtist = async (data: Artist) => {
  const saveData = {
    id: data?.id,
    name: data?.name,
    externalUrls: { spotify: data?.external_urls.spotify },
    genres: data?.genres,
    imageUrl: data?.images[0]?.url,
  };

  try {
    const response = await fetch(`/api/database/addArtist`, {
      method: 'POST',
      body: JSON.stringify(saveData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to save artist');
    }

    handleRefresh(MediaType.Artist);
  } catch (error) {
    console.error('Error saving artist:', error);
  }
};

export const onSaveAlbum = async (data: Album) => {
  const saveData = {
    id: data?.id,
    name: data?.name,
    artist: data?.artists.map((artist) => artist.name).join(', '),
    externalUrls: data?.external_urls,
    imageUrl: data?.images[0]?.url,
  };

  try {
    const response = await fetch(`/api/database/addAlbum`, {
      method: 'POST',
      body: JSON.stringify(saveData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to save album');
    }

    handleRefresh(MediaType.Album);
  } catch (error) {
    console.error('Error saving album:', error);
  }
};
