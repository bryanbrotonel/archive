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
};

export default function ArchivePreview({
  title,
  subTitle,
  imageUrl,
  externalUrl,
  createdAt,
}: ArchivePreviewProps) {
  return (
    <div>
      <div className='flex flex-row gap-2'>
        <div className='shrink-0 content-center'>
          <Link href={externalUrl} target='_blank' rel='noopener noreferrer'>
            <Image
              className='rounded-lg border-2 border-white bg-cover'
              src={imageUrl}
              alt={`${title} - Artist Image`}
              width={100}
              height={100}
            />
          </Link>
        </div>
        <div className='flex-1 space-y-3 overflow-hidden p-2'>
          <div className='space-y-1'>
            <h1 className='text-lg font-sans font-bold truncate'>{title}</h1>
            {subTitle && <p className='text-sm text-gray-500'>{subTitle}</p>}
          </div>
          <p className='text-xs text-gray-400'>
            {timeAgo(new Date(createdAt).getTime())}
          </p>
        </div>
      </div>
    </div>
  );
}
