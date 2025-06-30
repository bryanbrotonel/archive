import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import useSWR from 'swr';
import {
  MediaType,
  Entity,
  SortOptionsType,
  sortOptions,
} from '../../lib/types';
import { sortEntityData, swrFetcher, swrMiddleware } from '../../lib/utils';
import ArchiveTable from './archiveTable';
import { convertToTableData } from '../../(home)/api';
import { useArchiveSearch } from '../../lib/useArchiveSearch';

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
    { key: 'genres', label: 'Genre(s)' },
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
    { key: 'channel', label: 'Channel' },
  ],
};

export default function ArchiveList() {
  const [type, setType] = useState<MediaType>(MediaType.Track);
  const [sortBy, setSortBy] = useState<SortOptionsType>('createdAt:desc');
  const [mediaState, setMediaState] =
    useState<Record<MediaType, MediaTypeState>>(INITIAL_MEDIA_STATE);
  const [fetchingData, setFetchingData] = useState(true);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const { data, error, isLoading } = useSWR<
    { data: Entity[]; total: number },
    Error
  >(
    fetchingData
      ? `/api/database/getItems?type=${type}&page=${mediaState[type].page}&limit=10`
      : null,
    swrFetcher,
    { use: [swrMiddleware] }
  );

  const {
    searchValue,
    setSearchValue,
    searchResults,
    showResults: showSearchResults,
    loadMore,
    clearResults: clearSearchResults,
  } = useArchiveSearch(type);

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

  const handleLoadMore = useCallback(() => {
    if (showSearchResults) {
      loadMore();
    } else if (mediaState[type].data.length < mediaState[type].total) {
      setMediaState((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          page: prev[type].page + 1,
        },
      }));
      setFetchingData(true);
    }
  }, [loadMore, mediaState, showSearchResults, type]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const currentSentinel = sentinelRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isLoading && !fetchingData) {
          handleLoadMore();
        }
      },
      {
        root: scrollContainerRef.current,
        rootMargin: '0px 0px -100px 0px',
      }
    );
    observer.observe(currentSentinel);
    return () => {
      if (currentSentinel) observer.unobserve(currentSentinel);
    };
  }, [isLoading, fetchingData, type, mediaState, handleLoadMore]);

  // Sort and filter data
  const sortedData = useMemo(
    () =>
      sortEntityData(
        (showSearchResults ? searchResults : mediaState[type].data) || [],
        type,
        sortBy
      ),
    [showSearchResults, searchResults, mediaState, type, sortBy]
  );

  const handleTypeChange = (mediaType: MediaType) => {
    clearSearchResults();
    setType(mediaType);
    if (mediaState[mediaType].data.length === 0) setFetchingData(true);
  };

  return (
    <div>
      <div className='sticky top-0 z-20 bg-primary overflow-x-auto'>
        <div className='relative mt-3'>
          <div className='absolute left-0 bottom-0 z-0 h-[2px] w-full bg-black' />
          <div className='relative z-10 flex gap-2'>
            {Object.values(MediaType).map((mediaType) => (
              <button
                key={mediaType}
                className={`rounded-md rounded-b-none border-2 border-black px-4 py-1 ${
                  type === mediaType &&
                  'bg-primary-dark text-black border-b-primary-dark'
                }`}
                onClick={() => handleTypeChange(mediaType)}
              >
                {mediaType}s
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className='sticky top-12 z-10 bg-primary border-x-2 border-black/20 p-3'>
        <div className='flex flex-col items-center justify-between gap-2 md:flex-row'>
          <input
            type='text'
            value={searchValue}
            className='w-full rounded-md border border-gray-300 p-2 text-sm text-black dark:text-white'
            placeholder='Search...'
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOptionsType)}
            className='w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-500 hover:cursor-pointer dark:text-white md:w-auto'
            aria-label='Sort Options'
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='flex flex-col space-y-4 rounded-b-sm border-2 border-t-0 border-black/20 p-4'>
        {sortedData && (
          <div className='flex-1 min-h-0'>
            <ArchiveTable
              headers={headersMap[type] || []}
              data={convertToTableData(sortedData, type)}
              loadRef={sentinelRef}
              isLoading={isLoading}
            />
          </div>
        )}
        {error && <div>Error: {error.message}</div>}
      </div>
    </div>
  );
}
