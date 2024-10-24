'use client';

import React, { useState } from 'react';
import Data from './data';
import { MediaType } from '@/app/lib/types';

export default function Dashboard() {
  const [mediaType, setMediaType] = useState<MediaType>(
    Object.values(MediaType)[0]
  );

  function onSelectChange(val: MediaType) {
    setMediaType(val);
  }

  return (
    <div>
      <div>Dashboard</div>
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
  );
}
