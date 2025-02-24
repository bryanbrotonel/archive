'use client'

import React, { useState } from 'react';
import { MediaType } from '@/app/lib/types';
import AlbumPreview from './mediaPreviews/albumPreview';
import ArtistPreview from './mediaPreviews/artistPreview';
import TrackPreview from './mediaPreviews/trackPreview';
import VideoPreview from './mediaPreviews/videoPreview';
import SearchBar from '../ui/SearchBar';

export default function MediaSearch() {
  const [mediaPreview, setMediaPreview] = useState<{
    type: MediaType;
    id: string;
  }>({ type: MediaType.Artist, id: '' });

  const handleSearchResults = (type: MediaType, id: string) => {
    console.log('Search results:', type, id);
    setMediaPreview({ type, id });
  };

  let mediaContent;

  switch (mediaPreview.type) {
    case MediaType.Album:
      // mediaContent = <AlbumPreview id='6DlLdXBGCsSDPOV8R2pCl7' />;
      mediaContent = <AlbumPreview id={mediaPreview.id} />;
      break;
    case MediaType.Artist:
      mediaContent = <ArtistPreview id='7tr9pbgNEKtG0GQTKe08Tz' />;
      mediaContent = <ArtistPreview id={mediaPreview.id} />;
      break;
    case MediaType.Track:
      // mediaContent = <TrackPreview id='63ABAnFKJCp28TAyqf2cGL' />;
      mediaContent = <TrackPreview id={mediaPreview.id} />;
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
      <SearchBar onSubmit={handleSearchResults} />
      <div>
        <span>{JSON.stringify(mediaPreview, null, 1)}</span>
      </div>
      <div>{mediaPreview.id && mediaContent}</div>
    </div>
  );
}
