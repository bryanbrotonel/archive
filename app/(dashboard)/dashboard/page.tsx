import React from 'react';
import MediaSearch from '../../ui/mediaSearch';
import ArchiveList from '../../ui/archiveList';
import Link from 'next/link';
import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect('/dashboard/login');
  }
  return (
    <div className='max-w-4xl mx-auto px-4 md:px-0'>
      <div className='my-10 space-y-2 flex flex-col md:flex-row md:items-center md:justify-between'>
        <div className='flex flex-row items-center gap-2'>
          <Link href='/'>
            <span className='text-white/70 hover:text-white hover:underline transition-colors duration-200 text-sm'>
              &#8592; Home
            </span>
          </Link>
          <h1 className='text-4xl font-bold'>Dashboard</h1>
        </div>
        <div className='flex flex-row items-center gap-2'>
          <div>
            {/* Logout button */}
            <button
              onClick={async () => {
                'use server';
                await signOut();
              }}
            >
              <div className='px-2.5 py-1 rounded-md bg-red-800 hover:bg-red-700 transition-colors duration-200'>
                <span className='text-white/70 hover:text-white transition-colors duration-200'>
                  Logout
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className='flex flex-col lg:flex-row md:space-x-5 md:justify-between'>
        <MediaSearch />
        <ArchiveList />
      </div>
    </div>
  );
}
