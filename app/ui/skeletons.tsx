// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-black/10 before:to-transparent';

export function ArchiveItemSkeleton() {
  return (
    <div className='group flex flex-row p-2 gap-3 items-center sm:grid sm:grid-cols-16 rounded-md'>
      {/* Image skeleton */}
      <div
        className={`${shimmer} relative h-12 w-12 sm:h-full sm:w-auto aspect-square border-1 border-black/20 rounded-lg overflow-hidden sm:col-span-1 bg-black/10`}
      />
      {/* Text columns skeleton */}
      <div className='flex-1 flex flex-col gap-2 justify-between truncate sm:col-span-15 md:col-span-12 sm:flex-row'>
        {[...Array(2)].map((_, idx) => (
          <div
            key={idx}
            className='relative block max-w-full select-text flex-2'
            style={{ overflow: 'hidden' }}
          >
            <div
              className={`${shimmer} bg-black/10 rounded h-4 w-38 sm:w-48`}
            />
          </div>
        ))}
      </div>
      {/* Time and arrow skeleton */}
      <div className='hidden md:flex items-center justify-end text-xs md:col-span-3 gap-2'>
        <div className={`${shimmer} bg-black/10 rounded h-3 w-12`} />
        <div className={`${shimmer} bg-black/10 rounded-full w-4 h-4`} />
      </div>
    </div>
  );
}