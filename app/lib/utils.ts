import {
  Album as SpotifyAlbum,
  Track as SpotifyTrack,
  Artist as SpotifyArtist,
  SimplifiedArtist,
  SimplifiedAlbum,
  Image,
} from '@spotify/web-api-ts-sdk';
import { Album, Artist, ConvertedVideo, Track, VideoInput } from './types';

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

export const swrFetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.error.message);
  }
  return data;
};