import { useMemo, useState, useEffect, useCallback } from 'react';
import useSWR from 'swr';
import { MediaType, Entity, SortOptionsType, sortOptions } from '../lib/types';
import { sortEntityData, swrFetcher, swrMiddleware } from '../lib/utils';
import DisplayTable from '../ui/displayTable';
import { convertToTableData } from './api';

// Define the type for each media type's state
type MediaTypeState = {
  page: number;
  total: number;
  data: Entity[];
};

// Create the initial state for all media types
const INITIAL_MEDIA_STATE: Record<MediaType, MediaTypeState> = {
  [MediaType.Artist]: { page: 1, total: 0, data: [] },
  [MediaType.Album]: { page: 1, total: 0, data: [] },
  [MediaType.Track]: { page: 1, total: 0, data: [] },
  [MediaType.Video]: { page: 1, total: 0, data: [] },
};

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

export default function ArchiveList() {
  const [type, setType] = useState<MediaType>(MediaType.Album);
  const [sortBy, setSortBy] = useState<SortOptionsType>('createdAt:desc');
  const [mediaState, setMediaState] =
    useState<Record<MediaType, MediaTypeState>>(INITIAL_MEDIA_STATE);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [fetchingData, setFetchingData] = useState(true);

  // Fetch data with SWR
  const { data, error, isLoading } = useSWR<
    { data: Entity[]; total: number },
    Error
  >(
    fetchingData
      ? `/api/database/getItems?type=${type}&page=${mediaState[type].page}&limit=2&order=latest`
      : null,
    swrFetcher,
    { use: [swrMiddleware] }
  );

  // Update mediaState when new data arrives
  useEffect(() => {
    if (data) {
      setMediaState((prev) => ({
        ...prev,
        [type]: {
          page: prev[type].page,
          total: data.total ?? prev[type].total,
          data: [...prev[type].data, ...(data.data ?? [])],
        },
      }));
      setFetchingData(false);
    }
  }, [data, type]);

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchQuery(searchQuery), 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Sort and filter data
  const sortedData = useMemo(
    () =>
      sortEntityData(
        mediaState[type].data || [],
        type,
        sortBy,
        debouncedSearchQuery
      ),
    [mediaState, type, sortBy, debouncedSearchQuery]
  );

  // Handlers
  const handleTypeChange = (mediaType: MediaType) => {
    setType(mediaType);
    if (mediaState[mediaType].data.length === 0) setFetchingData(true);
  };

  const handleLoadMore = useCallback(() => {
    setMediaState((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        page: prev[type].page + 1,
      },
    }));
    setFetchingData(true);
  }, [type]);

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
              onClick={() => handleTypeChange(mediaType)}
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
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        {sortedData && (
          <div>
            <DisplayTable
              headers={headersMap[type] || []}
              data={convertToTableData(sortedData, type)}
            />
            {mediaState[type].data.length < mediaState[type].total && (
              <div className='flex justify-center my-4'>
                <button
                  className='px-4 py-1 bg-black/5 text-black rounded hover:bg-primary-dark transition'
                  onClick={handleLoadMore}
                >
                  {isLoading ? 'Loading' : 'Load more'}
                </button>
              </div>
            )}
          </div>
        )}
        {error && <div>Error: {error.message}</div>}
      </div>
    </div>
  );
}
