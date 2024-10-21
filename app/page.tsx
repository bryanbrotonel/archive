'use client';

import useSWR from 'swr';
import { getYouTubeVideoId } from './lib/api/youtube';
import Dashboard from './ui/dashboard';
import { ResponseError } from './interfaces';
import { convertVideoData } from './lib/utils';
import { VideoInput } from './lib/types';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export default function Home() {
  const videoId = getYouTubeVideoId(
    'https://youtu.be/FEkOYs6aWIg?si=xz0wH1UeAe3prB-r'
  );
  const { data, error, isLoading } = useSWR<object, ResponseError>(
    () => `/api/youtube/video/${videoId}`,
    fetcher
  );

  const displayYoutubeData = () => {
    if (error) return <div>{error.message}</div>;
    if (isLoading) return <div>Loading...</div>;
    if (!data) return null;

    return (
      <pre className='text-wrap'>
        {JSON.stringify(convertVideoData(data as VideoInput), null, 2)}
      </pre>
    );
  };

  return (
    <div className='grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-source-serif)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <div>
          <span className='text-3xl'>Bryan&apos;s Archive</span>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <h1>Spotify Data</h1>
            <Dashboard />
          </div>
          <div>
            <h1>YouTube Data</h1>
            {displayYoutubeData()}
          </div>
        </div>
      </main>
      <footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center font-[family-name:var(--font-roboto-mono)]'>
        <span className='text-xs'>
          Bryan Brotonel {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  );
}
