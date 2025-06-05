import { useMemo, useState, useEffect } from 'react';
import useSWR from 'swr';
import { MediaType, Entity, SortOptionsType, sortOptions } from '../lib/types';
import { sortEntityData, swrFetcher, swrMiddleware } from '../lib/utils';
import DisplayTable from '../ui/displayTable';
import { convertToTableData } from './api';

export default function ArchiveList() {
  const [type, setType] = useState<MediaType>(MediaType.Album);
  const [sortBy, setSortBy] = useState<SortOptionsType>('createdAt:desc');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('');

  const { data, error, isLoading } = useSWR<{ data: Entity[] }, Error>(
    `/api/database/getItems?type=${type}`,
    swrFetcher,
    { use: [swrMiddleware] }
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const sortedData = useMemo(
    () => sortEntityData(data?.data || [], type, sortBy, debouncedSearchQuery),
    [data, type, sortBy, debouncedSearchQuery]
  );

  const headersMap: Record<MediaType, { key: string; label: string }[]> = {
    [MediaType.Artist]: [
      { key: 'title', label: 'Name' },
      { key: 'genre', label: 'Genre' },
    ],
    [MediaType.Album]: [
      { key: 'title', label: 'Title' },
      { key: 'artist', label: 'Artist' },
    ],
    [MediaType.Track]: [
      { key: 'title', label: 'Title' },
      { key: 'artist', label: 'Artist' },
    ],
    [MediaType.Video]: [
      { key: 'title', label: 'Title' },
      { key: 'channeltitle', label: 'Channel' },
    ],
  };

  return (
    <div>
      <div className='overflow-x-auto overflow-y-hidden'>
        <div className='flex gap-2 translate-y-[2px]'>
          {Object.values(MediaType).map((mediaType) => (
            <button
              key={mediaType}
              className={`px-4 py-1 rounded-md rounded-b-none border-black border-2 ${
                type === mediaType &&
                'bg-primary-dark text-black border-b-primary-dark'
              }`}
              onClick={() => setType(mediaType)}
            >
              {mediaType}
            </button>
          ))}
        </div>
      </div>
      <div className='border-2 border-black/20 border-t-black rounded-b-sm bg-black/2 p-4 space-y-4 mt-[-2px]'>
        {/* Search Bar */}
        <div className='flex flex-col-reverse md:flex-row justify-end md:items-start gap-2'>
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOptionsType)}
              className='w-full md:w-auto px-3 py-1.5 border border-gray-300 rounded-md text-gray-500 dark:text-white hover:cursor-pointer'
              aria-label='Sort Options'
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <input
              type='text'
              value={searchQuery}
              className='text-sm border border-gray-300 rounded-md p-2 w-full text-black dark:text-white'
              placeholder='Search...'
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
          </div>
        </div>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {data?.data && (
          <DisplayTable
            headers={headersMap[type] || []}
            data={convertToTableData(sortedData, type)}
          />
        )}
      </div>
    </div>
  );
}
