import {
  Album as SpotifyAlbum,
  Track as SpotifyTrack,
  Artist as SpotifyArtist,
  SimplifiedArtist,
  SimplifiedAlbum,
  SearchResults,
} from '@spotify/web-api-ts-sdk';
import {
  Album,
  Artist,
  ConvertedVideo,
  Entity,
  MediaType,
  SearchItemType,
  SortOptionsType,
  Track,
  Video,
  VideoInput,
} from './types';
import { Middleware, SWRHook } from 'swr';

export const convertArtistData = (
  data: SpotifyArtist | SimplifiedArtist
): Artist => ({
  id: data.id,
  name: data.name,
  imageUrl: 'images' in data ? data.images[0]?.url : '',
  externalUrls: { spotify: data.external_urls.spotify },
  genres: 'genres' in data ? data.genres : [],
  createdAt: '',
  updatedAt: '',
});

export const convertAlbumData = (
  data: SpotifyAlbum | SimplifiedAlbum
): Album => ({
  id: data.id,
  name: data.name,
  artist: data.artists.map((artist) => artist.name).join(', '),
  imageUrl: 'images' in data ? data.images[0]?.url : '',
  externalUrls: { spotify: data.external_urls.spotify },
  genres: data.genres,
  createdAt: '',
  updatedAt: '',
});

export const convertTrackData = (data: SpotifyTrack): Track => ({
  id: data.id,
  name: data.name,
  artist: data.artists.map((artist) => artist.name).join(', '),
  externalUrls: { spotify: data.external_urls.spotify },
  previewUrl: data.preview_url,
  trackNumber: data.track_number,
  imageUrl: data.album.images[0]?.url || '',
  genres: data.album?.genres ?? [],
  createdAt: '',
  updatedAt: '',
});

export const convertVideoData = (input: VideoInput): ConvertedVideo => {
  const { id, title, thumbnails, channelTitle, channelId, publishedAt } = input;

  return {
    id,
    title,
    thumbnailUrl: thumbnails.medium.url,
    videoUrl: `https://www.youtube.com/watch?v=${id}`,
    channelTitle,
    channelId,
    channelUrl: `https://www.youtube.com/channel/${channelId}`,
    publishedAt,
  };
};

export const swrFetcher = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.error.message);
  }

  return data;
};

export const swrMiddleware: Middleware =
  (useSWRNext: SWRHook) => (key, fetcher, config) => {
    const snakeToCamel = (obj: any): any => {
      if (Array.isArray(obj)) {
        return obj.map(snakeToCamel);
      } else if (obj && typeof obj === 'object') {
        return Object.entries(obj).reduce((acc, [key, value]) => {
          const camelKey = key.replace(/_([a-z])/g, (_, char) =>
            char.toUpperCase()
          );
          acc[camelKey] = snakeToCamel(value);
          return acc;
        }, {} as Record<string, any>);
      }
      return obj;
    };

    const wrappedFetcher = async (...args: any[]) => {
      const data = await fetcher?.(...args);
      return snakeToCamel(data);
    };

    return useSWRNext(key, wrappedFetcher, config);
  };

export const timeAgo = (timestamp: number): string => {
  const now = Date.now(); // Current time in milliseconds
  const diff = now - timestamp; // Difference in milliseconds

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds <= 0) {
    return 'Just now';
  } else if (seconds < 60) {
    return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
  } else if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  } else if (days < 5) {
    return `${days} day${days === 1 ? '' : 's'} ago`;
  } else {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
};

export const sortSearchResults = (
  data: SearchResults<['album', 'artist', 'track']>
): SearchItemType[] => {
  const searchItems: SearchItemType[] = [];

  searchItems.push(
    ...data.albums.items
      .filter((album: SimplifiedAlbum) => album.album_type !== 'single')
      .map((album: SimplifiedAlbum) => ({
        id: album.id,
        type: MediaType.Album,
        title: album.name,
        subTitle: album.artists.map((artist) => artist.name).join(', '),
        imageUrl: album.images[0]?.url || '',
        popularity: album.popularity,
      }))
  );

  searchItems.push(
    ...data.artists.items.map((artist: SpotifyArtist) => ({
      id: artist.id,
      type: MediaType.Artist,
      title: artist.name,
      imageUrl: artist.images[0]?.url || '',
      popularity: artist.popularity,
    }))
  );

  searchItems.push(
    ...data.tracks.items.map((track: SpotifyTrack) => ({
      id: track.id,
      type: MediaType.Track,
      title: track.name,
      subTitle: track.artists.map((artist) => artist.name).join(', '),
      imageUrl: track.album.images[0]?.url || '',
      popularity: track.popularity,
    }))
  );

  return searchItems.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
};

// Sort data by createdAt in descending order
export const sortEntityData = (
  data: Entity[],
  type: MediaType,
  sortBy: SortOptionsType,
  search?: string
) => {
  const getTitle = (item: Entity): string => {
    if (type === MediaType.Video) {
      return (item as Video).videoTitle;
    }
    return (item as Album | Track | Artist).name;
  };

  const getSubtitle = (item: Entity): string => {
    if (type === MediaType.Video) {
      return (item as Video).channelTitle;
    }
    if (type === MediaType.Track) {
      return (item as Track).artist;
    }
    if (type === MediaType.Album) {
      return (item as Album).artist;
    }
    return '';
  };

  let filteredData = data;
  if (search && search.trim() !== '') {
    const lowerSearch = search.toLowerCase();
    filteredData = data.filter((item) => {
      switch (type) {
        case MediaType.Album:
        case MediaType.Track:
        case MediaType.Video:
          return (
            getTitle(item).toLowerCase().includes(lowerSearch) ||
            getSubtitle(item).toLowerCase().includes(lowerSearch)
          );
        default:
          return getTitle(item).toLowerCase().includes(lowerSearch);
      }
    });
  }

  return [...filteredData].sort((a, b) => {
    switch (sortBy) {
      case 'createdAt:asc':
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case 'createdAt:desc':
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'title:asc':
        return getTitle(a).localeCompare(getTitle(b));
      case 'title:desc':
        return getTitle(b).localeCompare(getTitle(a));
      default:
        return 0;
    }
  });
};
