import { ConvertedVideo } from "@/app/lib/types";
import { Album, Artist, Track } from '@spotify/web-api-ts-sdk';

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
    videoUrl: videoUrl,
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

    console.log('Save successful');
  } catch (error) {
    console.error('Error saving video:', error);
  }
};

export const onSaveTrack = async (data: Track) => {
  const saveData = {
    id: data?.id,
    name: data?.name,
    trackNumber: data?.track_number,
    previewUrl: data?.preview_url,
    externalUrls: data?.external_urls,
    genres: data?.album.genres,
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

    console.log('Save successful');
  } catch (error) {
    console.error('Error saving track:', error);
  }
};

export const onSaveArtist = async (data: Artist) => {
  const saveData = {
    id: data?.id,
    name: data?.name,
    externalUrls: data?.external_urls,
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

    console.log('Save successful');
  } catch (error) {
    console.error('Error saving artist:', error);
  }
};

export const onSaveAlbum = async (data: Album) => {
  const saveData = {
    id: data?.id,
    name: data?.name,
    artist: data?.artists.map((artist) => artist.name).join(', '),
    totalTracks: data?.total_tracks,
    releaseDate: data?.release_date,
    externalUrls: data?.external_urls,
    genres: data?.genres,
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

    console.log('Save successful');
  } catch (error) {
    console.error('Error saving album:', error);
  }
};