import {
  Album,
  Artist,
  Entity,
  MediaType,
  Track,
  Video,
} from '@/app/lib/types';
import ArchivePreview from './archivePreview';
import { deleteEntry } from './api';

interface MediaListProps {
  type: MediaType;
  data: Entity[];
  total: number;
  scrollRef?: React.RefObject<HTMLDivElement>;
}

export default function MediaList({ type, data, scrollRef }: MediaListProps) {
  const mediaList = data.map((item: Entity, index: number) => {
    const commonProps = {
      createdAt: item.createdAt,
      deleteEntry: () => deleteEntry(item.id, type),
    };
    switch (type) {
      case MediaType.Album:
        const album = item as Album;
        return (
          <ArchivePreview
            key={item.id}
            {...commonProps}
            title={album.name}
            subTitle={album.artist}
            imageUrl={album.imageUrl}
            externalUrl={album.externalUrls?.spotify ?? ''}
            className={`${
              index % 2 === 0 ? 'bg-gray-300/10' : 'bg-gray-400/20'
            }`}
          />
        );

      case MediaType.Track:
        const track = item as Track;
        return (
          <ArchivePreview
            key={item.id}
            {...commonProps}
            title={track.name}
            subTitle={track.artist}
            imageUrl={track.imageUrl}
            externalUrl={track.externalUrls?.spotify ?? ''}
            className={`${
              index % 2 === 0 ? 'bg-gray-300/10' : 'bg-gray-400/20'
            }`}
          />
        );

      case MediaType.Video:
        const video = item as Video;
        return (
          <ArchivePreview
            key={item.id}
            {...commonProps}
            title={video.videoTitle}
            subTitle={video.channelTitle}
            imageUrl={video.thumbnailUrl}
            externalUrl={video.externalUrls?.youtube ?? ''}
            className={`${
              index % 2 === 0 ? 'bg-gray-300/10' : 'bg-gray-400/20'
            }`}
          />
        );

      case MediaType.Artist:
        const artist = item as Artist;
        return (
          <ArchivePreview
            key={item.id}
            {...commonProps}
            title={artist.name}
            imageUrl={artist.imageUrl}
            externalUrl={artist.externalUrls?.spotify ?? ''}
            className={`${
              index % 2 === 0 ? 'bg-gray-300/10' : 'bg-gray-400/20'
            }`}
          />
        );

      default:
        return null;
    }
  });

  return (
    <div className='space-y-6 md:w-xl max-w-full'>
      {/* Media List Section */}
      <div
        ref={scrollRef}
        className='space-y-4 max-h-80 overflow-auto scrollbar'
      >
        {mediaList.length > 0 ? (
          <div className='rounded-md overflow-hidden'>{mediaList}</div>
        ) : (
          <p className='text-gray-500 text-center'>No items to display.</p>
        )}
      </div>
    </div>
  );
}
