import { MediaType } from '@/app/lib/types';
import useSWR from 'swr';
import { Track } from '@spotify/web-api-ts-sdk';
import { convertTrackData, swrFetcher } from '@/app/lib/utils';
import MeidaPreview from '../mediaPreview';

export default function TrackPreview(props: { id: string }) {
  const { data, error, isLoading } = useSWR<Track, Error>(
    `/api/spotify/track/${props.id}`,
    swrFetcher,
    { revalidateOnFocus: false }
  );

  const onSave = async (data: Track) => {
    const saveData = {
      id: data?.id,
      name: data?.name,
      trackNumber: data?.track_number,
      previewUrl: data?.preview_url,
      externalUrls: data?.external_urls,
      genres: data?.album.genres,
      imageUrl: data?.album.images[0].url,
    };

    try {
      const response = await fetch(`/api/database/addTrack`, {
        method: 'POST',
        body: JSON.stringify(saveData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to save track');
      }

      console.log('Save successful');
    } catch (error) {
      console.error('Error saving track:', error);
    }
  };

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
        <button
          onClick={() => onSave(data)}
          className='rounded-md bg-white text-black p-2'
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
