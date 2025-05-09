'use client';

import { useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { Album, Artist, Track, Video, MediaType, Entity } from '../lib/types';
import { swrFetcher, swrMiddleware } from '../lib/utils';
import DisplayTable from './displayTable';

export default function Home() {
  const [type, setType] = useState<MediaType>(MediaType.Album);

  const { data, error, isLoading } = useSWR<{ data: Entity[] }, Error>(
    `/api/database/getItems?type=${type}`,
    swrFetcher,
    { use: [swrMiddleware] }
  );

  const convertToTableData = (
    data: Entity[],
    type: MediaType
  ): Array<{
    key: string;
    title: string;
    imageurl: string;
    externalurl: string;
    // [key: string]: string;
  }> => {
    switch (type) {
      case MediaType.Artist:
        return (data as Artist[]).map((artist) => ({
          key: artist.id,
          title: artist.name,
          genres: artist.genres.join(', '),
          imageurl: artist.imageUrl,
          externalurl: artist.externalUrls.spotify || '',
          createdat: artist.createdAt,
        }));
      case MediaType.Album:
        return (data as Album[]).map((album) => ({
          key: album.id,
          title: album.name,
          artist: album.artist,
          imageurl: album.imageUrl,
          externalurl: album.externalUrls.spotify || '',
          createdat: album.createdAt,
        }));
      case MediaType.Track:
        return (data as Track[]).map((track) => ({
          key: track.id,
          title: track.name,
          artist: track.artist,
          imageurl: track.imageUrl,
          externalurl: track.externalUrls.spotify || '',
          createdat: track.createdAt,
        }));
      case MediaType.Video:
        return (data as Video[]).map((video) => ({
          key: video.id,
          title: video.videoTitle,
          channel: video.channelTitle,
          imageurl: video.thumbnailUrl,
          externalurl: video.externalUrls.youtube || '',
          createdat: video.createdAt,
        }));
      default:
        return [];
    }
  };

  const headersMap: Record<MediaType, { key: string; label: string }[]> = {
    [MediaType.Artist]: [
      { key: 'title', label: 'Name' },
      { key: 'genre', label: 'Genre' },
    ],
    [MediaType.Album]: [
      { key: 'title', label: 'Title' },
      { key: 'artist', label: 'Artist' },
    ],
    [MediaType.Track]: [
      { key: 'title', label: 'Title' },
      { key: 'artist', label: 'Artist' },
    ],
    [MediaType.Video]: [
      { key: 'title', label: 'Title' },
      { key: 'channeltitle', label: 'Channel' },
    ],
  };

  const getTableHeaders = (type: MediaType) => headersMap[type] || [];

  const typeButtons = Object.values(MediaType).map((mediaType) => (
    <button
      key={mediaType}
      className={`px-4 py-1 rounded-md rounded-b-none border-black border-2 ${
        type === mediaType
          ? 'bg-primary-dark text-black border-b-primary-dark'
          : ''
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
          <div className='overflow-x-auto overflow-y-hidden'>
            <div className='flex gap-2 translate-y-[2px]'>{typeButtons}</div>
          </div>
          <div className='border-2 border-black/20 border-t-black rounded-b-sm bg-black/2 p-4 space-y-4 mt-[-2px]'>
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
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {data?.data && (
              <DisplayTable
                headers={getTableHeaders(type)}
                data={convertToTableData(data.data, type)}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
