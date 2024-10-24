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

export type spotifyApiError = {
  error: {
    status: number
    message: string
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
  previewUrl: string
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

export type VideoInput = {
  id: string,
  title: string;
  channelId: string;
  channelTitle: string;
  publishedAt: string;
  thumbnails: {
    standard: {
      url: string;
      width: number;
      height: number;
    };
  };
};

export type ConvertedVideo = {
  id: string,
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  channelTitle: string;
  channelId: string;
  channelUrl: string;
};