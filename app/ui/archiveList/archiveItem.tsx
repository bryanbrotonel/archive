import { timeAgo } from '@/app/lib/utils';
import ScrollableText from '../scrollableText';
import Image from 'next/image';

interface ArchiveItemProps {
  item: {
    imageurl: string;
    externalurl: string;
    [key: string]: string;
  };
  displayDots?: boolean;
}

export const ArchiveItem = ({
  item,
  displayDots = false,
}: ArchiveItemProps) => {
  const columns = Object.entries(item).filter(
    ([key]) => !['key', 'imageurl', 'externalurl', 'createdat'].includes(key)
  );

  return (
    <div className='group flex flex-row p-2 gap-3 items-center sm:grid sm:grid-cols-16 hover:cursor-pointer hover:bg-primary-dark rounded-md'>
      <div className='relative h-12 w-12 sm:h-full sm:w-auto aspect-square border-1 border-black rounded-lg overflow-hidden sm:col-span-1'>
        <Image
          className='object-cover'
          src={item.imageurl}
          alt={`Image of ${item.key ?? ''}`}
          fill
          sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
        />
      </div>
      <div className='flex-1 flex flex-col gap-2 justify-between truncate sm:col-span-15 md:col-span-12 sm:flex-row'>
        {columns.map(([key, value], index) => (
          <div
            key={key}
            className={`relative block max-w-full select-text ${
              index === 0 ? 'flex-3 font-bold' : 'flex-2'
            }`}
            style={{ overflow: 'hidden' }}
          >
            {/* Dots background (desktop only) */}
            {displayDots && columns[index + 1]?.[1] && (
              <div
                aria-hidden='true'
                className='hidden sm:block absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full h-px pointer-events-none bg-[repeating-linear-gradient(to_right,transparent_0_0.1em,#aaa_0em_0.3em)] bg-[length:1.5em_1px] bg-repeat-x z-0 opacity-100'
              />
            )}
            <ScrollableText>
              <span className='bg-primary group-hover:bg-primary-dark'>
                {value}
              </span>
            </ScrollableText>
          </div>
        ))}
      </div>
      <div className='hidden md:flex items-center justify-end text-xs md:col-span-3'>
        <span className='truncate'>
          {timeAgo(new Date(item.createdat).getTime())}
        </span>
        <span className='w-4 h-4 ml-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-100'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='text-black-secondary'
          >
            <path d='M12 4L4 12' />
            <path d='M5.5 4h6.5v6.5' />
          </svg>
        </span>
      </div>
    </div>
  );
};
