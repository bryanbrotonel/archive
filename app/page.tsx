import { loadSpotifyData } from './lib/dashboardData';

export default async function Home() {
  const data = await loadSpotifyData();

  return (
    <div className='grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-source-serif)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <div>
          <span className='text-3xl'>Bryan&apos;s Archive</span>
        </div>
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
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
