import Link from 'next/link';

import React from 'react';
import { ArchiveItem } from './archiveItem';
import { ArchiveItemSkeleton } from '../skeletons';

export type ArchiveTableProps = {
  headers: Array<{ key: string; label: string }>;
  data: Array<{
    key: string;
    title: string;
    imageurl: string;
    externalurl: string;
    [key: string]: string;
  }>;
  loadRef: React.RefObject<HTMLDivElement>;
  isLoading?: boolean;
};

export default function ArchiveTable({
  headers,
  data,
  loadRef,
  isLoading = false,
}: ArchiveTableProps) {
  return (
    <div className='h-full flex flex-col'>
      <div className='sticky top-27 py-3 z-10 bg-primary hidden gap-3 items-center sm:grid sm:grid-cols-16'>
        <div className='flex gap-2 col-span-15 md:col-span-12 col-start-2! text-xs text-black-secondary'>
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
      <div className='h-full'>
        {isLoading && data.length === 0
          ? // Fill the visible area with skeletons
            Array.from({ length: 7 }).map((_, idx) => (
              <ArchiveItemSkeleton key={idx} />
            ))
          : data.map(
              (item: {
                imageurl: string;
                externalurl: string;
                [key: string]: string;
              }) => (
                <Link key={item.key} href={item.externalurl} target='_blank'>
                  <ArchiveItem item={item} displayDots={true} />
                </Link>
              )
            )}
        <div ref={loadRef} className='h-1 w-full' aria-hidden='true'>
          {isLoading && (
            <div className='flex justify-center items-center py-2'>
              <div className='flex flex-row gap-2'>
                <div className='w-1 h-1 rounded-full bg-black-secondary animate-bounce'></div>
                <div className='w-1 h-1 rounded-full bg-black-secondary animate-bounce [animation-delay:-.3s]'></div>
                <div className='w-1 h-1 rounded-full bg-black-secondary animate-bounce [animation-delay:-.5s]'></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
