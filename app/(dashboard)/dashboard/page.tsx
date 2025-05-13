import React from 'react';
import MediaSearch from './mediaSearch';
import ArchiveList from './archiveList';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div>
      <div className='my-10 space-y-2 flex flex-col md:flex-row md:items-center md:justify-between'>
        <h1 className='text-4xl font-bold'>Dashboard</h1>
        <div className='flex flex-row'>
          <Link href='/' className='group'>
            <div className='px-2.5 py-1 rounded-md bg-gray-800 group-hover:bg-gray-700 transition-colors duration-200'>
              <span className='text-white/70 group-hover:text-white transition-colors duration-200'>
                Home
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className='flex flex-col md:flex-row md:space-x-5 md:justify-between'>
        <div>
          <h2 className='mb-5 text-xl font-mono'>Archive Something Cool!</h2>
          <MediaSearch />
        </div>
        <ArchiveList />
      </div>
    </div>
  );
}
