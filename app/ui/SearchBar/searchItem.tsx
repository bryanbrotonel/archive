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

export default function SearchItem(props: SearchItemProps) {
  const { type, title, subTitle, imageUrl, onClick } = props;

  const subTitleComponent = () => {
    switch (type) {
      case MediaType.Artist:
        return <h2 className='font-sans text-sm text-black/50'>{type}</h2>;
      default:
        return <h2 className='font-sans text-sm text-black'>{subTitle}</h2>;
    }
  };

  const imageClass = () => {
    switch (type) {
      case MediaType.Artist:
        return 'rounded-full';
      default:
        return 'rounded-md';
    }
  };

  return (
    <div className='mb-2'>
      <button
        onClick={onClick}
        className='w-full text-left hover:bg-slate-400 rounded-md p-2'
      >
        <div className='flex row gap-2'>
          <Image
            src={imageUrl}
            alt={`Image of ${title}`}
            width={50}
            height={50}
            className={`${imageClass()} h-10 w-10`}
          />
          <div>
            <h1 className='font-mono'>{title}</h1>
            {subTitleComponent()}
          </div>
        </div>
      </button>
    </div>
  );
}
