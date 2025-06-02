import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { timeAgo } from '@/app/lib/utils';
import { useModal } from '@/app/modal-provider';

export type ArchivePreviewProps = {
  title: string;
  subTitle?: string;
  imageUrl: string;
  externalUrl: string;
  createdAt: string;
  deleteEntry?: () => void;
  className?: string;
};

export default function ArchivePreview({
  title,
  subTitle,
  imageUrl,
  externalUrl,
  createdAt,
  deleteEntry,
  className = '',
}: ArchivePreviewProps) {
  const { queueModal } = useModal();
  return (
    <div className={`${className}`}>
      <Link href={externalUrl} target='_blank' rel='noopener noreferrer'>
        <div className='flex flex-col md:flex-row gap-2 justify-between hover:bg-primary/10 p-2 rounded-md transition-colors duration-50 group'>
          <div className='flex flex-row gap-2'>
            <div className='shrink-0'>
              <Image
                className='rounded-lg border-2 border-white bg-cover'
                src={imageUrl}
                alt={`${title} - Artist Image`}
                width={50}
                height={50}
              />
            </div>
            <div className='flex-1 space-y-1 overflow-hidden'>
              <div className='overflow-y-clip'>
                <p className='font-sans font-bold break-words'>{title}</p>
                {subTitle && (
                  <p className='text-sm text-gray-500'>{subTitle}</p>
                )}
              </div>
              <div className='flex flex-row items-center gap-2'>
                <p className='text-xs text-gray-400'>
                  {timeAgo(new Date(createdAt).getTime())}
                </p>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-end justify-between'>
            {deleteEntry && (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent event propagation
                  e.preventDefault(); // Prevent default link behavior

                  queueModal({
                    title: 'Delete Entry',
                    content: (
                      <p>
                        Are you sure you want to delete this entry? This action
                        cannot be undone.
                      </p>
                    ),
                    onSuccess: deleteEntry,
                    successButtonText: 'Yes, delete',
                    dismissButtonText: 'No, keep it',
                  });
                }}
                className='flex items-center gap-1 rounded-md py-1 px-3 bg-red-500 hover:bg-red-600 text-sm text-white font-medium transition-colors duration-150'
                aria-label='Delete Entry'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                  className='w-4 h-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
                Delete
              </button>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
