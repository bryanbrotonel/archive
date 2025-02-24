import { MediaType } from '@/app/lib/types';
import ArchivePreview from './archivePreview';

interface MediaListProps {
  type: MediaType;
  data: any; // TODO: Define the type of data
}

export default function MediaList(props: MediaListProps) {
  const { type, data } = props;

  let mediaList;

  switch (type) {
    case MediaType.Album:
      mediaList = data.map(
        (album: {
          id: string;
          name: string;
          artist: string;
          imageurl: string;
          externalUrls: object;
          createdat: string;
        }) => {
          return (
            <ArchivePreview
              key={album.id}
              title={album.name}
              subTitle={album.artist}
              imageUrl={album.imageurl}
              externalUrl={''}
              createdAt={album.createdat}
            />
          );
        }
      );
      break;
    case MediaType.Track:
      mediaList = data.map(
        (track: {
          id: string;
          name: string;
          artist: string;
          imageurl: string;
          externalUrls: object;
          createdat: string;
        }) => {
          return (
            <ArchivePreview
              key={track.id}
              title={track.name}
              subTitle={track.artist}
              imageUrl={track.imageurl}
              externalUrl={''}
              createdAt={track.createdat}
            />
          );
        }
      );
      break;
    case MediaType.Video:
      mediaList = data.map(
        (video: {
          videoid: string;
          videotitle: string;
          channelid: string;
          channeltitle: string;
          thumbnailurl: string;
          createdat: string;
        }) => {
          return (
            <ArchivePreview
              key={video.videoid}
              title={video.videotitle}
              subTitle={video.channeltitle}
              imageUrl={video.thumbnailurl}
              externalUrl={''}
              createdAt={video.createdat}
            />
          );
        }
      );
      break;
    case MediaType.Artist:
      mediaList = data.map(
        (artist: {
          id: string;
          name: string;
          imageurl: string;
          externalUrls: object;
          createdat: string;
        }) => {
          return (
            <ArchivePreview
              key={artist.id} // Assuming each artist has a unique id
              title={artist.name}
              subTitle={''}
              imageUrl={artist.imageurl}
              externalUrl={''}
              createdAt={artist.createdat}
            />
          );
        }
      );
      break;
    default:
      mediaList = <></>;
  }

  return <div className='space-y-4'>{mediaList}</div>;
}
