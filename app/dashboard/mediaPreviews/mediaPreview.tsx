import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MediaType } from '../../lib/types';

export type artistProfileProps = {
  title: string;
  subTitle?: string;
  imageUrl: string;
  type: MediaType;
  externalUrl: string;
};

export default function MeidaPreview(props: artistProfileProps) {
  const { title, subTitle, imageUrl, externalUrl, type } = props;

  let formatTitle, formatSubtitle;

  switch (type) {
    case MediaType.Album:
    case MediaType.Track:
    case MediaType.Video:
      formatTitle = (
        <span>
          <span className='font-bold'>Title: </span>
          {title}
        </span>
      );
      formatSubtitle = (
        <span>
          <span className='font-bold'>Artist: </span>
          {subTitle}
        </span>
      );
      break;
    case MediaType.Artist:
      formatTitle = (
        <span>
          <span className='font-bold'>Artist: </span>
          {title}
        </span>
      );
      break;

    default:
      formatTitle = <h1>{title}</h1>;
      formatSubtitle = subTitle && <h2>subtitle</h2>;
      break;
  }

  return (
    <div className='space-y-4'>
      <p className='text-sm text-white'>{type}</p>
      <div className='w-fit'>
        <Link href={externalUrl} target='_blank' rel='noopener noreferrer'>
          <Image
            className='rounded-lg border-2 border-white bg-cover'
            src={imageUrl}
            alt={`${title} - Artist Image`}
            width={200}
            height={200}
          />
        </Link>
      </div>
      <div>
        <h1 className='font-mono'>{formatTitle}</h1>
        {formatSubtitle}
      </div>
      <div className='w-fit'>
        <Link href={externalUrl} target='_blank' rel='noopener noreferrer'>
          <span>Source</span>
        </Link>
      </div>
    </div>
  );
}
