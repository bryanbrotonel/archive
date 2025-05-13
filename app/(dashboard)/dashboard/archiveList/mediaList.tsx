import { useMemo, useState } from 'react';
import {
  Album,
  Artist,
  Entity,
  MediaType,
  sortOptions,
  SortOptionsType,
  Track,
  Video,
} from '@/app/lib/types';
import ArchivePreview from './archivePreview';
import { deleteEntry, handleRefresh, seedDatabase } from './api';
import { sortEntityData } from '@/app/lib/utils';

interface MediaListProps {
  type: MediaType;
  data: Entity[];
}

export default function MediaList({ type, data }: MediaListProps) {
  const [sortBy, setSortBy] = useState<SortOptionsType>('createdAt:desc');

  const sortedData = useMemo(
    () => sortEntityData(data, type, sortBy),
    [data, type, sortBy]
  );

  const mediaList = sortedData.map((item: Entity, index: number) => {
    const commonProps = {
      createdAt: item.createdAt,
      deleteEntry: () => deleteEntry(item.id, type),
    };
    switch (type) {
      case MediaType.Album:
        const album = item as Album;
        return (
          <ArchivePreview
            key={item.id}
            {...commonProps}
            title={album.name}
            subTitle={album.artist}
            imageUrl={album.imageUrl}
            externalUrl={album.externalUrls?.spotify ?? ''}
            className={`${
              index % 2 === 0 ? 'bg-gray-300/10' : 'bg-gray-400/20'
            }`}
          />
        );

      case MediaType.Track:
        const track = item as Track;
        return (
          <ArchivePreview
            key={item.id}
            {...commonProps}
            title={track.name}
            subTitle={track.artist}
            imageUrl={track.imageUrl}
            externalUrl={track.externalUrls?.spotify ?? ''}
            className={`${
              index % 2 === 0 ? 'bg-gray-300/10' : 'bg-gray-400/20'
            }`}
          />
        );

      case MediaType.Video:
        const video = item as Video;
        return (
          <ArchivePreview
            key={item.id}
            {...commonProps}
            title={video.videoTitle}
            subTitle={video.channelTitle}
            imageUrl={video.thumbnailUrl}
            externalUrl={video.externalUrls?.youtube ?? ''}
            className={`${
              index % 2 === 0 ? 'bg-gray-300/10' : 'bg-gray-400/20'
            }`}
          />
        );

      case MediaType.Artist:
        const artist = item as Artist;
        return (
          <ArchivePreview
            key={item.id}
            {...commonProps}
            title={artist.name}
            imageUrl={artist.imageUrl}
            externalUrl={artist.externalUrls?.spotify ?? ''}
            className={`${
              index % 2 === 0 ? 'bg-gray-300/10' : 'bg-gray-400/20'
            }`}
          />
        );

      default:
        return null;
    }
  });

  return (
    <div className='space-y-6 w-xl max-w-full'>
      {/* Header Section */}
      <div className='flex flex-col md:justify-between'>
        <h3 className='text-lg font-sans font-semibold capitalize'>{type}</h3>
        <div className='flex flex-col md:flex-row gap-2 md:items-center md:justify-between'>
          <div className='flex items-center'>
            <span className='text-sm text-white/50'>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOptionsType)}
              className='px-3 py-1 text-white'
              aria-label='Sort Options'
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className='flex items-center space-x-2'>
            <button
              onClick={() => handleRefresh(type)}
              className='px-3 py-1 rounded-md bg-indigo-700 hover:bg-indigo-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
              aria-label='Refresh'
            >
              &#128260;
            </button>
            <button
              onClick={() => seedDatabase(type)}
              className='px-3 py-1 rounded-md bg-indigo-700 hover:bg-indigo-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
              aria-label='Refresh'
            >
              &#127793;
            </button>
          </div>
        </div>
      </div>

      {/* Media List Section */}
      <div className='space-y-4 max-h-80 overflow-auto scrollbar'>
        {mediaList.length > 0 ? (
          <div className='rounded-md overflow-hidden'>{mediaList}</div>
        ) : (
          <p className='text-gray-500 text-center'>No items to display.</p>
        )}
      </div>
    </div>
  );
}
