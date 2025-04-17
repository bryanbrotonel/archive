import React from 'react';
import Image from 'next/image';
import { MediaType } from '@/app/lib/types';

interface SearchItemProps {
  type: MediaType;
  title: string;
  subTitle?: string;
  imageUrl: string;
  onClick: () => void;
}

export default function SearchItem({
  type,
  title,
  subTitle,
  imageUrl,
  onClick,
}: SearchItemProps) {
  const subTitleComponent = () => (
    <h2
      className={`font-sans text-sm truncate ${
        type === MediaType.Artist ? 'text-black/50' : 'text-black'
      }`}
    >
      {type === MediaType.Artist ? type : subTitle}
    </h2>
  );

  const imageClass = type === MediaType.Artist ? 'rounded-full' : 'rounded-md';

  return (
    <div className='mb-2'>
      <button
        onClick={onClick}
        className='w-full text-left hover:bg-indigo-400 rounded-md p-2'
      >
        <div className='flex row gap-2'>
          <Image
            src={imageUrl}
            alt={`Image of ${title}`}
            width={50}
            height={50}
            className={`${imageClass} h-10 w-10`}
          />
          <div className='overflow-hidden'>
            <p className='truncate'>{title}</p>
            {subTitleComponent()}
          </div>
        </div>
      </button>
    </div>
  );
}
