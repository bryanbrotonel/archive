import { MediaType } from '@/app/lib/types';
import useSWR from 'swr';
import { Track } from '@spotify/web-api-ts-sdk';
import { convertTrackData, swrFetcher } from '@/app/lib/utils';
import MeidaPreview from '../mediaPreview';

export default function TrackPreview(props: { id: string }) {
  const { data, error, isLoading } = useSWR<Track, Error>(
    `/api/spotify/track/${props.id}`,
    swrFetcher
  );

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>Track Loading...</div>;
  if (!data) return <div>No track...</div>;

  const { name, album, artists, externalUrl } = convertTrackData(data);

  return (
    <div>
      <MeidaPreview
        title={name}
        subTitle={artists.map((artist) => artist.name).join(', ')}
        imageUrl={album.images[0].url ?? ''}
        externalUrl={externalUrl}
        type={MediaType.Track}
      />
      <div className='mt-5'>
        <button className='rounded-md bg-white text-black p-2'>
          Save Changes
        </button>
      </div>
    </div>
  );
}
