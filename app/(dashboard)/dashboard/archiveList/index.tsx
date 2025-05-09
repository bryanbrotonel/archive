'use client';

import useSWR, { mutate } from 'swr';
import { Entity, MediaType } from '@/app/lib/types';
import { swrFetcher, swrMiddleware } from '@/app/lib/utils';
import MediaList from './mediaList';
import { useState } from 'react';

const ArchiveList = () => {
  const [mediaType, setMediaType] = useState<MediaType>(
    Object.values(MediaType)[0]
  );

  const { data, error, isLoading } = useSWR<
    {
      data: Entity[];
    },
    Error
  >(`/api/database/getItems?type=${mediaType}`, swrFetcher, {
    use: [swrMiddleware],
  });

  const handleRefresh = () => {
    mutate(`/api/database/getItems?type=${mediaType}`);
  };

  const seedDatabase = async () => {
    const response = await fetch('/api/database/seed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to seed database');
    }
    const data = await response.json();
    console.log('Database seeded:', data);
    // Optionally, you can trigger a refresh of the data after seeding
    mutate(`/api/database/getItems?type=${mediaType}`);
  };

  return (
    <div className='space-y-5'>
      <h2 className='mb-5 text-xl font-mono'>Archive List</h2>
      <div>
        <button onClick={seedDatabase}>Seed</button>
      </div>
      <div className='space-y-5'>
        <div className='flex space-x-2'>
          {Object.values(MediaType).map((type) => (
            <button
              key={type}
              onClick={() => setMediaType(type)}
              className={`px-3 py-1 rounded-md ${
                mediaType === type ? 'bg-indigo-700' : 'bg-indigo-700/30'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <div className='flex gap-4 items-center'>
          <div className=''>
            <h3 className='text-lg font-sans font-semibold'>{mediaType}</h3>
          </div>
          <div>
            <button
              onClick={handleRefresh}
              className='px-3 py-1 rounded-md bg-indigo-700 hover:bg-indigo-800 text-white'
            >
              <span>&#128260;</span>
            </button>
          </div>
        </div>
      </div>

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && (
        <div className='space-y-4'>
          <MediaList data={data.data} type={mediaType} />
          <details>
            <summary>Show Raw Data</summary>
            <pre>{JSON.stringify(data.data, null, 1)}</pre>
          </details>
        </div>
      )}
    </div>
  );
};

export default ArchiveList;
