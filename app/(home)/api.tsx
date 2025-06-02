import { Album, Artist, Track, Video, MediaType, Entity } from '../lib/types';

export const convertToTableData = (
  data: Entity[],
  type: MediaType
): Array<{
  key: string;
  title: string;
  imageurl: string;
  externalurl: string;
  // [key: string]: string;
}> => {
  switch (type) {
    case MediaType.Artist:
      return (data as Artist[]).map((artist) => ({
        key: artist.id,
        title: artist.name,
        genres: artist.genres.join(', '),
        imageurl: artist.imageUrl,
        externalurl: artist.externalUrls.spotify || '',
        createdat: artist.createdAt,
      }));
    case MediaType.Album:
      return (data as Album[]).map((album) => ({
        key: album.id,
        title: album.name,
        artist: album.artist,
        imageurl: album.imageUrl,
        externalurl: album.externalUrls.spotify || '',
        createdat: album.createdAt,
      }));
    case MediaType.Track:
      return (data as Track[]).map((track) => ({
        key: track.id,
        title: track.name,
        artist: track.artist,
        imageurl: track.imageUrl,
        externalurl: track.externalUrls.spotify || '',
        createdat: track.createdAt,
      }));
    case MediaType.Video:
      return (data as Video[]).map((video) => ({
        key: video.id,
        title: video.videoTitle,
        channel: video.channelTitle,
        imageurl: video.thumbnailUrl,
        externalurl: video.externalUrls.youtube || '',
        createdat: video.createdAt,
      }));
    default:
      return [];
  }
};
