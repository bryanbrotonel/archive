import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export type artistProfileProps = {
  title: string;
  imageUrl: string;
  externalUrl: string;
  subTitle?: string;
};

export default function MeidaPreview(props: artistProfileProps) {
  const { title, subTitle, imageUrl, externalUrl } = props;

  return (
    <div>
      <Link href={externalUrl} target='_blank' rel='noopener noreferrer'>
        <Image
          className='rounded-lg'
          src={imageUrl}
          alt={`${title} - Artist Image`}
          width={200}
          height={200}
        />
      </Link>
      <h1>{title}</h1>
      {subTitle && <h2>{subTitle}</h2>}
      <div className='w-fit'>
        <Link href={externalUrl} target='_blank' rel='noopener noreferrer'>
          <span>Source</span>
        </Link>
      </div>
    </div>
  );
}
