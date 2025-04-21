export enum MediaType {
  Artist = 'Artist',
  Album = 'Album',
  Track = 'Track',
  Video = 'Video',
}

interface Image {
  url: string
  height: number
  width: number
}

export interface Artist {
  id: string
  name: string
  externalUrl: string
  genres: string[]
  images: Image[]
}

export interface Track {
  id: string
  album: Album
  name: string
  artists: Artist[]
  trackNumber: number
  externalUrl: string
  previewUrl: string | null
}

export interface Album {
  id: string
  name: string
  artists: Artist[]
  images: Image[]
  releaseDate: string
  totalTracks: number
  externalUrl: string
}

export interface DbArtist {
  id: string;
  name: string;
  externalurls: {
    spotify: string;
  };
  genres: string[];
  imageurl: string;
  createdat: string;
}

export interface DbAlbum {
  id: string;
  name: string;
  artist: string;
  imageurl: string;
  totaltracks: number;
  genres: string[];
  releasedate: string;
  externalurls: {
    spotify: string;
  };
  createdat: string;
}
export interface DbTrack {
  id: string;
  name: string;
  tracknumber: number;
  externalurls: {
    spotify: string;
  };
  previewurl: string | null;
  createdat: string;
  imageurl: string;
  genres: string[] | null;
}

export interface DbVideo {
  videoid: string;
  videotitle: string;
  channelid: string;
  channeltitle: string;
  thumbnailurl: string;
  publishedat: string;
  createdat: string;
  videourl: string;
}

export interface VideoInput {
  id: string;
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    // default: Thumbnail;
    // medium: Thumbnail;
    // high: Thumbnail;
    standard: {
      url: string;
      width: number;
      height: number;
    };
  };
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  defaultLanguage: string;
  localized: {
    title: string;
    description: string;
  };
  defaultAudioLanguage: string;
}

export type ConvertedVideo = {
  id: string,
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  channelTitle: string;
  channelId: string;
  channelUrl: string;
  publishedAt: string;
};

export type SearchItemType = { id: string, type: MediaType, title: string, subTitle?: string, imageUrl: string, popularity?: number }