import React from 'react';
import MediaSearch from './mediaSearch';
import ArchiveList from './archiveList';
import Link from 'next/link';
import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await auth();
  console.log('🚀 ~ Dashboard ~ session:', session);

  if (!session) {
    redirect('/dashboard/login');
  }
  return (
    <div>
      <div className='my-10 space-y-2 flex flex-col md:flex-row md:items-center md:justify-between'>
        <h1 className='text-4xl font-bold'>Dashboard</h1>
        <div className='flex flex-row items-center gap-2'>
          <Link href='/' className='group'>
            <div className='px-2.5 py-1 rounded-md bg-gray-800 group-hover:bg-gray-700 transition-colors duration-200'>
              <span className='text-white/70 group-hover:text-white transition-colors duration-200'>
                Home
              </span>
            </div>
          </Link>
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
