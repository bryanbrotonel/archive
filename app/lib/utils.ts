import {
  Album as SpotifyAlbum,
  Track as SpotifyTrack,
  Artist as SpotifyArtist,
  SimplifiedArtist,
  SimplifiedAlbum,
  Image,
  SearchResults,
  SimplifiedTrack,
} from '@spotify/web-api-ts-sdk';
import { Album, Artist, ConvertedVideo, MediaType, SearchItemType, Track, VideoInput } from './types';

export const convertArtistData = (
  data: SpotifyArtist | SimplifiedArtist
): Artist => ({
  id: data.id,
  name: data.name,
  images:
    'images' in data
      ? data.images.map((img: Image) => ({
        url: img.url,
        height: img.height,
        width: img.width,
      }))
      : [],
  externalUrl: data.external_urls?.spotify ?? '',
  genres: 'genres' in data ? data.genres : [],
});

export const convertAlbumData = (
  data: SpotifyAlbum | SimplifiedAlbum
): Album => ({
  id: data.id,
  name: data.name,
  artists: data.artists.map((artist: SpotifyArtist | SimplifiedArtist) =>
    convertArtistData(artist)
  ),
  images:
    data.images.map((img: Image) => ({
      url: img.url,
      height: img.height,
      width: img.width,
    })) ?? [],
  releaseDate: 'release_date' in data ? data.release_date : '',
  totalTracks: 'total_tracks' in data ? data.total_tracks : 0,
  externalUrl: data.external_urls?.spotify ?? '',
});

export const convertTrackData = (data: SpotifyTrack): Track => ({
  id: data.id,
  album: convertAlbumData(data.album),
  name: data.name,
  artists: data.artists.map((artist: SimplifiedArtist) =>
    convertArtistData(artist)
  ),
  externalUrl: data.external_urls.spotify,
  previewUrl: data.preview_url,
  trackNumber: data.track_number,
});

export const convertVideoData = (input: VideoInput): ConvertedVideo => {
  const { id, title, thumbnails, channelTitle, channelId, publishedAt } = input;

  return {
    id,
    title,
    thumbnailUrl: thumbnails.standard.url,
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

export const timeAgo = (timestamp: number): string => {
  const now = Date.now(); // Current time in milliseconds
  const diff = now - timestamp; // Difference in milliseconds

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  console.log('🚀 ~ timeAgo ~ seconds:', seconds)

  if (seconds <= 0) {
    return "Just now"
  } else if (seconds < 60) {
    return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
  } else if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  } else if (days < 5) {
    return `${days} day${days === 1 ? '' : 's'} ago`;
  } else if (weeks < 3) {
    return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
  } else if (months < 12) {
    return `${months} month${months === 1 ? '' : 's'} ago`;
  } else {
    return `${years} year${years === 1 ? '' : 's'} ago`;
  }
}

export const sortSearchResults = (data: SearchResults<['album', 'artist', 'track']>): SearchItemType[] => {
  const searchItems: SearchItemType[] = [];

  searchItems.push(
    ...data.albums.items.filter((album: SimplifiedAlbum) => album.album_type !== 'single')
      .map((album: SimplifiedAlbum) => ({
        id: album.id,
        type: MediaType.Album,
        title: album.name,
        subTitle: album.artists.map(artist => artist.name).join(', '),
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
      subTitle: track.artists.map(artist => artist.name).join(', '),
      imageUrl: track.album.images[0]?.url || '',
      popularity: track.popularity,
    }))
  );

  return searchItems.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
};
