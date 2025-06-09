'use client';

import useSWR from 'swr';
import { Entity, MediaType } from '@/app/lib/types';
import { swrFetcher, swrMiddleware } from '@/app/lib/utils';
import MediaList from './mediaList';
import { useEffect, useState } from 'react';

const ArchiveList = () => {
  const [entryData, setEntryData] = useState<Entity[]>([]);
  const [page, setPage] = useState(1);

  const [mediaType, setMediaType] = useState<MediaType>(
    Object.values(MediaType)[0]
  );

  const { data, error, isLoading } = useSWR<
    {
      data: Entity[];
      total: number;
    },
    Error
  >(
    `/api/database/getItems?type=${mediaType}&page=${page}&limit=10&order=latest`,
    swrFetcher,
    {
      use: [swrMiddleware],
    }
  );

  useEffect(() => {
    if (data) {
      setEntryData((prev) => [...prev, ...(data.data ?? [])]);
    }
  }, [data]);

  return (
    <div className='space-y-5'>
      <h2 className='mb-5 text-xl font-mono'>Archive List</h2>
      <div className='space-y-5'>
        <div className='flex space-x-2 overflow-x-scroll no-scrollbar'>
          {Object.values(MediaType).map((type) => (
            <button
              key={type}
              onClick={() => {
                setMediaType(type);
                setPage(1);
                setEntryData([]); // Reset entry data when changing type
              }}
              className={`px-3 py-1 rounded-md whitespace-nowrap ${
                mediaType === type ? 'bg-indigo-700' : 'bg-indigo-700/30'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      {error && <div>Error: {error.message}</div>}
      {entryData && (
        <div className='space-y-4'>
          <MediaList data={entryData} total={data?.total || 0} type={mediaType} />
          {data && entryData.length < data.total && (
            <div className='w-full flex items-center justify-center'>
              <button
                className='px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700'
                onClick={() => {
                  // Simple client-side pagination: fetch more items
                  // We'll use a local state to track how many items to fetch
                  setPage((prev) => prev + 1);
                }}
              >
                {isLoading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
          <details>
            <summary>Show Raw Data</summary>
            <pre>{JSON.stringify(entryData, null, 1)}</pre>
          </details>
        </div>
      )}
    </div>
  );
};

export default ArchiveList;
