import { MediaType } from '@/app/lib/types';
import useSWR from 'swr';
import { Track } from '@spotify/web-api-ts-sdk';
import { convertTrackData, swrFetcher } from '@/app/lib/utils';
import MediaPreview from './mediaPreview';
import { onSaveTrack } from './api';

export default function TrackPreview(props: { id: string }) {
  const { data, error, isLoading } = useSWR<Track, Error>(
    `/api/spotify/track/${props.id}`,
    swrFetcher,
    { revalidateOnFocus: false }
  );

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>Track Loading...</div>;
  if (!data) return <div>No track...</div>;

  const {
    name,
    artist,
    imageUrl,
    externalUrls: { spotify },
  } = convertTrackData(data);

  return (
    <div>
      <MediaPreview
        title={name}
        subTitle={artist}
        imageUrl={imageUrl}
        externalUrl={spotify || ''}
        type={MediaType.Track}
      />
      <div className='mt-5'>
        <button
          onClick={() => onSaveTrack(data)}
          className='rounded-md bg-white text-black p-2'
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
