export enum MediaType {
  Artist = 'Artist',
  Album = 'Album',
  Track = 'Track',
  Video = 'Video',
}

// Base interface with common fields
interface BaseRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// External URLs type (used across multiple tables)
interface ExternalUrls {
  spotify?: string;
  youtube?: string;
  appleMusic?: string;
  [key: string]: string | undefined; // Allow other platforms
}

// Artist
export interface Artist extends BaseRecord {
  name: string;
  imageUrl: string;
  genres: string[];
  externalUrls: ExternalUrls;
}

// Album
export interface Album extends BaseRecord {
  name: string;
  artist: string;
  imageUrl: string;
  genres: string[];
  externalUrls: ExternalUrls;
}

// Track
export interface Track extends BaseRecord {
  name: string;
  artist: string;
  previewUrl?: string | null;
  imageUrl: string;
  genres: string[];
  externalUrls: ExternalUrls;
  trackNumber?: number | null;
}

// Video
export interface Video extends BaseRecord {
  videoTitle: string;
  channelId?: string | null;
  channelTitle: string;
  thumbnailUrl: string;
  externalUrls: ExternalUrls;
  publishedAt?: Date | string | null;
}

// Union type of all entity types
export type Entity = Artist | Album | Track | Video;

// Type guards for entity types
export function isArtist(entity: Entity): entity is Artist {
  return 'name' in entity && !('videoTitle' in entity);
}

export function isAlbum(entity: Entity): entity is Album {
  return 'name' in entity && 'artist' in entity && !('previewUrl' in entity);
}

export function isTrack(entity: Entity): entity is Track {
  return 'previewUrl' in entity;
}

export function isVideo(entity: Entity): entity is Video {
  return 'videoTitle' in entity;
}

export interface VideoInput {
  id: string;
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
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

// Database response types
export interface DatabaseResult<T> {
  data: T[];
  error?: string;
  count?: number;
}

// Pagination params
export interface PaginationParams {
  limit?: number;
  offset?: number;
}

// Filter options
export interface FilterOptions {
  genre?: string;
  artist?: string;
  minDate?: Date | string;
  maxDate?: Date | string;
}

export type SortOptionsType = 'createdAt:asc' | 'createdAt:desc' | 'title:asc' | 'title:desc';

export const sortOptions: Array<{ value: SortOptionsType; label: string }> = [
  { value: 'createdAt:asc', label: 'Archive date (asc)' },
  { value: 'createdAt:desc', label: 'Archive date (desc)' },
  { value: 'title:asc', label: 'Title (asc)' },
  { value: 'title:desc', label: 'Title (desc)' },
];