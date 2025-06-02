'use client';

import Link from 'next/link';
import Image from 'next/image';
import ArchiveList from './archiveList';

export default function Home() {
  return (
    <main className='space-y-4'>
      <div className='flex flex-col items-center justify-center max-w-xl mx-auto text-center text-sm space-y-4 mb-10'>
        <div className='w-fit'>
          <Image
            src='/images/logo.svg'
            alt="Bryan's Archive Logo"
            width={100}
            height={100}
            priority
          />
        </div>
        <h1 className='text-3xl font-bold'>Bryan&apos;s Archive</h1>
        <div className='space-y-2'>
          <p className='text-center text-gray-500 dark:text-gray-400'>
            My space for stuff I like, music related for now.
            <br />
            Find something new, share it with your friends.
          </p>
          <Link href='/dashboard'>Go to Dashboard</Link>
        </div>
      </div>
      <ArchiveList />
    </main>
  );
}
