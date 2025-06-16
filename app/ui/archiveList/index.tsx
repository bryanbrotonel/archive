'use client';

import useSWR from 'swr';
import {
  Entity,
  MediaType,
  sortOptions,
  SortOptionsType,
} from '@/app/lib/types';
import { sortEntityData, swrFetcher, swrMiddleware } from '@/app/lib/utils';
import MediaList from './mediaList';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useArchiveSearch } from '@/app/lib/useArchiveSearch';
import { handleRefresh } from './api';

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

export default function ArchiveList() {
  const [type, setType] = useState<MediaType>(MediaType.Track);
  const [sortBy, setSortBy] = useState<SortOptionsType>('createdAt:desc');
  const [mediaState, setMediaState] =
    useState<Record<MediaType, MediaTypeState>>(INITIAL_MEDIA_STATE);
  const [fetchingData, setFetchingData] = useState(true);

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
    <div className='space-y-5'>
      <h2 className='mb-5 text-xl font-mono'>Archive List</h2>
      <div className='space-y-5'>
        <div className='flex space-x-2 overflow-x-scroll no-scrollbar'>
          {Object.values(MediaType).map((mediaType) => (
            <button
              key={mediaType}
              onClick={() => handleTypeChange(mediaType)}
              className={`px-3 py-1 rounded-md whitespace-nowrap ${
                type === mediaType ? 'bg-indigo-700' : 'bg-indigo-700/30'
              }`}
            >
              {mediaType}
            </button>
          ))}
        </div>
      </div>
      {error && <div>Error: {error.message}</div>}
      <div className='flex flex-col md:justify-between'>
        <div className='mb-4'>
          <input
            type='text'
            placeholder='Search...'
            className='w-full px-3 py-2 rounded-md bg-gray-300/10 text-white focus:outline-none focus:ring-1 focus:ring-gray-400'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            aria-label='Search'
          />
        </div>
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
          <div className='flex items-center space-x-2 lg:flex-row-reverse gap-2'>
            <button
              onClick={() => handleRefresh(type)}
              className='px-3 py-1 rounded-md bg-indigo-700 hover:bg-indigo-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
              aria-label='Refresh'
            >
              &#128260;
            </button>
            <span> {data && ` (${sortedData.length}/${data.total})`}</span>
          </div>
        </div>
      </div>
      {sortedData && (
        <div className='space-y-4'>
          <MediaList data={sortedData} total={data?.total || 0} type={type} />
          {mediaState[type].data.length < mediaState[type].total && (
            <div className='w-full flex items-center justify-center'>
              <button
                className='px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700'
                onClick={() => {
                  if (!isLoading && !fetchingData) {
                    handleLoadMore();
                  }
                }}
              >
                {isLoading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
          <details>
            <summary>Show Raw Data</summary>
            <pre>{JSON.stringify(sortedData, null, 1)}</pre>
          </details>
        </div>
      )}
    </div>
  );
}
