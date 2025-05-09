import {
  Album,
  Artist,
  Entity,
  MediaType,
  Track,
  Video,
} from '@/app/lib/types';
import ArchivePreview from './archivePreview';

interface MediaListProps {
  type: MediaType;
  data: Entity[];
}

export default function MediaList(props: MediaListProps) {
  const { type, data } = props;

  let mediaList;

  switch (type) {
    case MediaType.Album:
      mediaList = (data as Album[]).map((album) => (
        <ArchivePreview
          key={album.id}
          title={album.name}
          subTitle={album.artist}
          imageUrl={album.imageUrl}
          externalUrl={''}
          createdAt={album.createdAt}
        />
      ));
      break;
    case MediaType.Track:
      mediaList = (data as Track[]).map((track: Track) => (
        <ArchivePreview
          key={track.id}
          title={track.name}
          subTitle={track.artist}
          imageUrl={track.imageUrl}
          externalUrl={''}
          createdAt={track.createdAt}
        />
      ));
      break;
    case MediaType.Video:
      mediaList = (data as Video[]).map((video: Video) => (
        <ArchivePreview
          key={video.id}
          title={video.videoTitle}
          subTitle={video.channelTitle}
          imageUrl={video.thumbnailUrl}
          externalUrl={video.externalUrls.youtube ?? ''}
          createdAt={video.createdAt}
        />
      ));
      break;
    case MediaType.Artist:
      mediaList = (data as Artist[]).map((artist: Artist) => (
        <ArchivePreview
          key={artist.id}
          title={artist.name}
          subTitle={''}
          imageUrl={artist.imageUrl}
          externalUrl={''}
          createdAt={artist.createdAt}
        />
      ));
      break;
    default:
      mediaList = <></>;
  }

  return <div className='space-y-4'>{mediaList}</div>;
}
