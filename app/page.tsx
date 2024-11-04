'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <main>
        <h1 className='text-3xl my-10'>Bryan&apos;s Archive</h1>
        <Link href='/dashboard'>Go to Dashboard</Link>
      </main>
    </div>
  );
}
