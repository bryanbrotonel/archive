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
      <div className='hidden px-2 gap-3 items-center sm:grid sm:grid-cols-16'>
        <div className='flex pb-2 gap-2 col-span-15 md:col-span-12 col-start-2! text-xs text-black-secondary'>
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
        <div
          ref={loadRef}
          className='h-1 w-full bg-transparent'
          aria-hidden='true'
        />
      </div>
    </div>
  );
}
