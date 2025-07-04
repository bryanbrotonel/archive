'use client';

import Image from 'next/image';
import ArchiveList from '../ui/archiveList';

export default function Home() {
  return (
    <main className='h-full max-w-4xl mx-auto'>
      <div className='flex flex-col items-center justify-center max-w-xl mx-auto text-center text-sm space-y-4 mb-10'>
        <div className='w-fit'>
          <Image
            src='/images/logo.svg'
            alt="Bryan's Archive Logo"
            width={65}
            height={65}
            priority
          />
        </div>
        <h1 className='text-2xl font-bold'>Bryan&apos;s Archive</h1>
        <div className='space-y-2'>
          <p className='text-center text-gray-500 dark:text-gray-400 text-xs'>
            My space for stuff I like, music related for now.
            <br />
            Find something new, share it with your friends.
          </p>
        </div>
      </div>
      <ArchiveList />
    </main>
  );
}
