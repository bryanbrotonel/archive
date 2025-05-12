import {
  Album,
  Artist,
  Entity,
  MediaType,
  Track,
  Video,
} from '@/app/lib/types';
import ArchivePreview from './archivePreview';
import { mutate } from 'swr';

interface MediaListProps {
  type: MediaType;
  data: Entity[];
}

export default function MediaList({ type, data }: MediaListProps) {
  let mediaList: JSX.Element[] | null = null;

  const deleteEntry = async (id: string, type: MediaType) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        entryID: id,
        entryType: type,
      }),
    };

    const response = await fetch('/api/database/deleteEntry', options);
    if (!response.ok) {
      throw new Error('Failed to delete entry');
    }

    const result = await response.json();
    console.log('Entry deleted:', result);
    mutate(`/api/database/getItems?type=${type}`);
  };

  switch (type) {
    case MediaType.Album:
      mediaList = (data as Album[]).map((album) => (
        <ArchivePreview
          key={album.id}
          title={album.name}
          subTitle={album.artist}
          imageUrl={album.imageUrl}
          externalUrl={album.externalUrls?.spotify ?? ''} 
          createdAt={album.createdAt}
          deleteEntry={() => deleteEntry(album.id, MediaType.Album)}
        />
      ));
      break;

    case MediaType.Track:
      mediaList = (data as Track[]).map((track) => (
        <ArchivePreview
          key={track.id}
          title={track.name}
          subTitle={track.artist}
          imageUrl={track.imageUrl}
          externalUrl={track.externalUrls?.spotify ?? ''}
          createdAt={track.createdAt}
          deleteEntry={() => deleteEntry(track.id, MediaType.Track)}
        />
      ));
      break;

    case MediaType.Video:
      mediaList = (data as Video[]).map((video) => (
        <ArchivePreview
          key={video.id}
          title={video.videoTitle}
          subTitle={video.channelTitle}
          imageUrl={video.thumbnailUrl}
          externalUrl={video.externalUrls?.youtube ?? ''}
          createdAt={video.createdAt}
          deleteEntry={() => deleteEntry(video.id, MediaType.Video)}
        />
      ));
      break;

    case MediaType.Artist:
      mediaList = (data as Artist[]).map((artist) => (
        <ArchivePreview
          key={artist.id}
          title={artist.name}
          imageUrl={artist.imageUrl}
          externalUrl={artist.externalUrls?.spotify ?? ''}
          createdAt={artist.createdAt}
          deleteEntry={() => deleteEntry(artist.id, MediaType.Artist)}
        />
      ));
      break;

    default:
      mediaList = null;
  }

  return (
    <div
      className='space-y-4 max-h-80 overflow-auto'
      style={{
        msScrollbarBaseColor: 'red',
        scrollbarColor: 'red',
        scrollbarWidth: 'thin',
      }}
    >
      {mediaList}
    </div>
  );
}
