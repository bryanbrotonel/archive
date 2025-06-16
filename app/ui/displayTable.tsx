import Image from 'next/image';
import { timeAgo } from '../lib/utils';
import Link from 'next/link';
import ScrollableText from './scrollableText';

import React from 'react';

export type DisplayTableProps = {
  headers: Array<{ key: string; label: string }>;
  data: Array<{
    key: string;
    title: string;
    imageurl: string;
    externalurl: string;
    [key: string]: string;
  }>;
  loadRef: React.RefObject<HTMLDivElement>;
};

export default function DisplayTable({
  headers,
  data,
  loadRef,
}: DisplayTableProps) {
  return (
    <div className='h-full flex flex-col'>
      <div className='hidden px-2 gap-3 items-center sm:grid sm:grid-cols-16'>
        <div className='flex pb-2 gap-2 col-span-15 md:col-span-12 col-start-2! text-xs text-black/50'>
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
      <div className='h-full overflow-y-scroll scrollbar'>
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
                    sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
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
                      <div
                        key={key}
                        className={`relative block max-w-full select-text ${
                          index === 0 ? 'flex-3 font-bold' : 'flex-2'
                        }`}
                        style={{ overflow: 'hidden' }}
                      >
                        {/* Dots background (desktop only) */}
                        {key === 'title' &&
                          headers.length > 1 &&
                          data.length > 0 &&
                          item[headers[1].key] !== undefined &&
                          item[headers[1].key] !== '' && (
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
                      className='text-black/50'
                    >
                      <path d='M12 4L4 12' />
                      <path d='M5.5 4h6.5v6.5' />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          )
        )}
        <div
          ref={loadRef}
          className='h-1 w-full bg-transparent'
          aria-hidden='true'
        />
      </div>
    </div>
  );
}
