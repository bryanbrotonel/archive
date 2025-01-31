'use client';

import React, { useState } from 'react';
import Data from './data';
import { MediaType } from '@/app/lib/types';
// import useSWR from 'swr';
// import { swrFetcher } from '../lib/utils';

export default function Dashboard() {
  const [mediaType, setMediaType] = useState<MediaType>(
    Object.values(MediaType)[0]
  );

  // const {
  //   data: entryData,
  //   error: entryError,
  //   isLoading: addArtistLoading,
  // } = useSWR<string, Error>(
  //   () => (mediaType === MediaType.Artist ? `/api/database/addArtist` : null),
  //   swrFetcher
  // );
  
  function onSelectChange(val: MediaType) {
    setMediaType(val);
  }
  // console.log('🚀 ~ Dashboard ~ addArtist:', entryData, entryError, addArtistLoading)

  return (
    <div>
      <h1 className='my-10 text-4xl font-bold'>Dashboard</h1>
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <h2 className='mb-10 text-xl font-mono'>Archive Something Cool!</h2>
          <form>
            <select
              onChange={(e) => onSelectChange(e.target.value as MediaType)}
              name='mediaType'
              className='bg-blue-700'
            >
              {Object.values(MediaType).map((mediaType) => (
                <option key={mediaType} value={mediaType}>
                  {mediaType}
                </option>
              ))}
            </select>
          </form>
          <Data mediaType={mediaType} />
        </div>
        <div>
          <h2 className='mb-10 text-xl font-mono'>Archive List</h2>
        </div>
      </div>
    </div>
  );
}
