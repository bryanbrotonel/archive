import useSWR from 'swr';
import { MediaType } from '@/app/lib/types';
import { Artist } from '@spotify/web-api-ts-sdk';
import { convertArtistData, swrFetcher } from '@/app/lib/utils';
import MediaPreview from './mediaPreview';
import { onSaveArtist } from './api';

export default function ArtistPreview({ id }: { id: string }) {
  const { data, error, isLoading } = useSWR<Artist, Error>(
    id ? `/api/spotify/artist/${id}` : null,
    swrFetcher,
    { revalidateOnFocus: false }
  );

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>Artist Loading...</div>;
  if (!data) return <div>No artist...</div>;

  const {
    name,
    externalUrls: { spotify },
    imageUrl,
  } = convertArtistData(data);

  return (
    <div>
      <MediaPreview
        title={name}
        imageUrl={imageUrl}
        externalUrl={spotify || ''}
        type={MediaType.Artist}
      />
      <div className='mt-5'>
        <button
          onClick={() => onSaveArtist(data)}
          className='rounded-md bg-white text-black p-2'
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
