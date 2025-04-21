'use client';

import { useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { DbAlbum, DbArtist, DbTrack, DbVideo, MediaType } from '../lib/types';
import { swrFetcher } from '../lib/utils';
import DisplayTable from './displayTable';

export default function Home() {
  const [type, setType] = useState<MediaType>(MediaType.Album);

  const { data, error, isLoading } = useSWR<
    {
      data: DbArtist[] | DbAlbum[] | DbTrack[] | DbVideo[];
    },
    Error
  >(`/api/database/getItems?type=${type}`, swrFetcher, {});

  const convertToTableData = (
    data: DbArtist[] | DbAlbum[] | DbTrack[] | DbVideo[],
    type: MediaType
  ): Array<{
    key: string;
    title: string;
    imageurl: string;
    externalurl: string;
    [key: string]: string;
  }> => {
    switch (type) {
      case MediaType.Artist:
        return (data as DbArtist[]).map((artist) => ({
          key: artist.id,
          title: artist.name,
          genres: artist.genres.join(', '),
          imageurl: artist.imageurl,
          externalurl: artist.externalurls.spotify,
          createdat: artist.createdat,
        }));
      case MediaType.Album:
        return (data as DbAlbum[]).map((album) => ({
          key: album.id,
          title: album.name,
          artist: album.artist,
          imageurl: album.imageurl,
          externalurl: album.externalurls.spotify,
          createdat: album.createdat,
        }));
      case MediaType.Track:
        return (data as DbTrack[]).map((track) => ({
          key: track.id,
          title: track.name,
          // artist: track.artists.map((artist) => artist.name).join(', '),
          imageurl: track.imageurl,
          externalurl: track.externalurls.spotify,
          createdat: track.createdat,
        }));
      case MediaType.Video:
        return (data as DbVideo[]).map((video) => ({
          key: video.videoid,
          title: video.videotitle,
          channel: video.channeltitle,
          imageurl: video.thumbnailurl,
          externalurl: video.videourl,
          createdat: video.createdat,
        }));
      default:
        return [];
    }
  };

  const headersMap: Record<MediaType, { key: string; label: string }[]> = {
    [MediaType.Artist]: [{ key: 'title', label: 'Name' }],
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
