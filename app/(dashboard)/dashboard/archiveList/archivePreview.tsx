import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { timeAgo } from '@/app/lib/utils';

export type ArchivePreviewProps = {
  title: string;
  subTitle?: string;
  imageUrl: string;
  externalUrl: string;
  createdAt: string;
  deleteEntry?: () => void;
};

export default function ArchivePreview({
  title,
  subTitle,
  imageUrl,
  externalUrl,
  createdAt,
  deleteEntry,
}: ArchivePreviewProps) {
  return (
    <div className='flex flex-row gap-2'>
      <div className='shrink-0'>
        <Link href={externalUrl} target='_blank' rel='noopener noreferrer'>
          <Image
            className='rounded-lg border-2 border-white bg-cover'
            src={imageUrl}
            alt={`${title} - Artist Image`}
            width={50}
            height={50}
          />
        </Link>
      </div>
      <div className='flex-1 space-y-1 overflow-hidden'>
        <div className=''>
          <p className=' font-sans font-bold truncate'>{title}</p>
          {subTitle && <p className='text-sm text-gray-500'>{subTitle}</p>}
        </div>
        <div className='flex flex-row items-center gap-2'>
          <p className='text-xs text-gray-400'>
            {timeAgo(new Date(createdAt).getTime())}
          </p>
          <div>
            <button
              onClick={deleteEntry}
              className={`text-xs px-1 py-1 rounded-md bg-red-800 hover:bg-red-700`}
            >
              delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
