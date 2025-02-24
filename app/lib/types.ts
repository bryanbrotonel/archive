export enum MediaType {
  Artist = 'Artist',
  Album = 'Album',
  Track = 'Track',
  Video = 'Video',
}

export type spotifyListeningProps = {
  isPlaying: boolean
  timestamp?: string
  track?: {
    title: string
    album: string
    albumImageUrl: string
    artists: string
    spotifyUrl: string
  }
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

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface Thumbnails {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
  standard: Thumbnail;
}

interface Localized {
  title: string;
  description: string;
}

export interface VideoInput {
  id: string;
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  defaultLanguage: string;
  localized: Localized;
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