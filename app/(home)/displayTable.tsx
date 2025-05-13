import Image from 'next/image';
import { timeAgo } from '../lib/utils';
import Link from 'next/link';

export type DisplayTableProps = {
  headers: Array<{ key: string; label: string }>;
  data: Array<{
    key: string;
    title: string;
    imageurl: string;
    externalurl: string;
    [key: string]: string;
  }>;
};

export default function DisplayTable({ headers, data }: DisplayTableProps) {
  return (
    <div>
      <div className='hidden px-2 gap-3 items-center sm:grid sm:grid-cols-16'>
        <div className='flex gap-2 col-span-15 md:col-span-12 col-start-2! text-xs text-black/50'>
          {headers.map((header: { key: string; label: string }) => (
            <span
              key={header.key}
              className={`truncate ${
                header.key === 'title' ? 'flex-3' : 'flex-2'
              }`}
            >
              {header.label}
            </span>
          ))}
        </div>
      </div>
      <div>
        {data.map(
          (item: {
            imageurl: string;
            externalurl: string;
            [key: string]: string;
          }) => (
            <Link key={item.key} href={item.externalurl} target='_blank'>
              <div className='group flex flex-row p-2 gap-3 items-center sm:grid sm:grid-cols-16 hover:cursor-pointer hover:bg-primary-dark rounded-md'>
                <div className='relative h-12 w-12 sm:h-full sm:w-auto aspect-square border-1 border-black rounded-lg overflow-hidden sm:col-span-1'>
                  <Image
                    className='object-cover'
                    src={item.imageurl}
                    alt={`Image of ${item.key}`}
                    fill={true}
                  />
                </div>
                <div className='flex-1 flex flex-col gap-2 justify-between truncate sm:col-span-15 md:col-span-12 sm:flex-row'>
                  {Object.entries(item)
                    .filter(
                      ([key]) =>
                        ![
                          'key',
                          'imageurl',
                          'externalurl',
                          'createdat',
                        ].includes(key)
                    )
                    .map(([key, value], index) => (
                      <span
                        key={key}
                        className={`truncate ${
                          index === 0 ? 'flex-3 font-bold' : 'flex-2'
                        }`}
                      >
                        {value === '' ? '-' : value}
                      </span>
                    ))}
                </div>
                <div className='hidden md:flex items-center justify-end text-xs md:col-span-3'>
                  <span className='truncate'>
                    {timeAgo(new Date(item.createdat).getTime())}
                  </span>
                  <div className='w-4 h-4 ml-2 rounded-full bg-transparent group-hover:bg-black/20 flex items-center justify-center'></div>
                </div>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
