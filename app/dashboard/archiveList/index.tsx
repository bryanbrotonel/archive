'use client';

import useSWR from 'swr';
import { MediaType } from '../../lib/types';
import { swrFetcher } from '../../lib/utils';
import MediaList from './mediaList';
import { useState } from 'react';

const ArchiveList = () => {
  const [mediaType, setMediaType] = useState<MediaType>(
    Object.values(MediaType)[0]
  );

  const { data, error, isLoading } = useSWR<
    {
      data: {
        id: string;
        name: string;
        imageurl: string;
        externalUrls: object;
        createdat: string;
      }[];
    },
    Error
  >(`/api/database/getItems?type=${mediaType}`, swrFetcher, {});

  return (
    <div className='space-y-3'>
      <h2 className='mb-5 text-xl font-mono'>Archive List</h2>
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
      <h3 className='mb-5 text-lg font-sans font-semibold'>{mediaType}</h3>
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
