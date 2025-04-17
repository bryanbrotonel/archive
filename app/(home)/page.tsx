'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useSWR from 'swr';
import { MediaType } from '../lib/types';
import { swrFetcher, timeAgo } from '../lib/utils';

export default function Home() {
  const [type, setType] = useState<MediaType>(MediaType.Album);

  const { data, error, isLoading } = useSWR<
    {
      data: {
        id: string;
        name: string;
        artist: string;
        imageurl: string;
        externalUrls: object;
        createdat: string;
      }[];
    },
    Error
  >(`/api/database/getItems?type=${type}`, swrFetcher, {});

  const typeButtons = Object.values(MediaType).map((mediaType) => (
    <button
      key={mediaType}
      className={`px-4 py-1 rounded-md rounded-b-none border-black border-t-2 border-x-2 ${
        type === mediaType ? 'bg-primary-dark text-black' : ''
      }`}
      onClick={() => setType(mediaType)}
    >
      {mediaType}
    </button>
  ));
  return (
    <div>
      <main className='space-y-4'>
        <div>
          <h1 className='text-3xl'>Bryan&apos;s Archive</h1>
        </div>
        <div>
          <Link href='/dashboard'>Go to Dashboard</Link>
        </div>
        <div>
          <div className='flex gap-2 border-b-2 overflow-x-auto'>
            {typeButtons}
          </div>
          <div className='border-1 border-black/20 rounded-b-sm bg-black/2 p-4 space-y-4'>
            {/* Search Bar */}
            <div className='flex justify-end'>
              <div className=''>
                <input
                  type='text'
                  value={''}
                  className='text-sm border border-gray-300 rounded-md p-2 w-full text-black dark:text-white'
                  placeholder='Search...'
                  onChange={(e) => {
                    console.log(e);
                  }}
                />
              </div>
            </div>
            {/* Headers */}
            <div className='hidden px-2 gap-3 items-center sm:grid sm:grid-cols-16'>
              <div className='flex gap-2 col-span-15 md:col-span-12 col-start-2! text-xs text-black/50'>
                <span className='flex-3 truncate'>Title</span>
                <span className='flex-2 truncate'>Artist</span>
              </div>
            </div>
            {/* Results */}
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {data?.data &&
              data.data.map(
                (item: {
                  id: string;
                  name: string;
                  artist: string;
                  imageurl: string;
                  externalUrls: object;
                  createdat: string;
                }) => (
                  <div
                    key={item.id}
                    className='group flex flex-row p-2 gap-3 items-center sm:grid sm:grid-cols-16 hover:cursor-pointer hover:bg-primary-dark rounded-md'
                  >
                    <div className='relative h-12 w-12 sm:h-full sm:w-auto aspect-square border-1 border-black rounded-lg overflow-hidden sm:col-span-1'>
                      <Image
                        className='object-cover'
                        src={item.imageurl}
                        alt={`${item.name}`}
                        fill={true}
                      />
                    </div>
                    <div className='flex-1 flex flex-col gap-2 justify-between truncate sm:col-span-15 md:col-span-12 sm:flex-row'>
                      <span className='flex-3 truncate font-bold'>
                        {item.name}
                      </span>
                      <span className='flex-2 truncate'>{item.artist}</span>
                    </div>
                    <div className='hidden md:flex items-center justify-end text-xs md:col-span-3'>
                      <span className='truncate'>
                        {timeAgo(new Date(item.createdat).getTime())}
                      </span>
                      <div className='w-4 h-4 ml-2 rounded-full bg-transparent group-hover:bg-black/20 flex items-center justify-center'></div>
                    </div>
                  </div>
                )
              )}
          </div>
        </div>
      </main>
    </div>
  );
}
