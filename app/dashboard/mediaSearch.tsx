import React, { useState } from 'react';
import { MediaType } from '@/app/lib/types';
import AlbumPreview from './mediaPreviews/albumPreview';
import ArtistPreview from './mediaPreviews/artistPreview';
import TrackPreview from './mediaPreviews/trackPreview';
import VideoPreview from './mediaPreviews/videoPreview';

export default function MediaSearch(props: { mediaType: MediaType | null }) {
  const { mediaType } = props;

  const [searchValue, setSearchValue] = useState<string>('');
  let mediaContent;

  switch (mediaType) {
    case MediaType.Album:
      mediaContent = <AlbumPreview id='6DlLdXBGCsSDPOV8R2pCl7' />;
      break;
    case MediaType.Artist:
      mediaContent = <ArtistPreview id='7tr9pbgNEKtG0GQTKe08Tz' />;
      break;
    case MediaType.Track:
      mediaContent = <TrackPreview id='63ABAnFKJCp28TAyqf2cGL' />;
      break;
    case MediaType.Video:
      mediaContent = (
        <VideoPreview url='https://youtu.be/FEkOYs6aWIg?si=Fx7ysoovYa0DW_oA' />
      );
      break;
    default:
      mediaContent = <div>No media type selected</div>;
      break;
  }

  return (
    <div className='mt-5'>
      {/* TODO: Add search bar */}
      <div className='mb-2'>
        <input
          type='text'
          value={searchValue}
          placeholder='Search...'
          onChange={(e) => setSearchValue(e.target.value)}
          className='bg-white text-slate-900 rounded-md border-none p-2'
        />
      </div>
      <div>{mediaContent}</div>
    </div>
  );
}
