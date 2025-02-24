import React from 'react';
import MediaSearch from './mediaSearch';
import ArchiveList from './archiveList';

export default function Dashboard() {
  return (
    <div>
      <h1 className='my-10 text-4xl font-bold'>Dashboard</h1>
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <h2 className='mb-10 text-xl font-mono'>Archive Something Cool!</h2>
          <MediaSearch />
        </div>
        <ArchiveList />
      </div>
    </div>
  );
}
