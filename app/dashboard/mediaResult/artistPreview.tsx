import { MediaType } from '@/app/lib/types';
import useSWR from 'swr';
import { Artist } from '@spotify/web-api-ts-sdk';
import { convertArtistData, swrFetcher } from '@/app/lib/utils';
import MeidaPreview from '../mediaPreview';

export default function ArtistPreview(props: { id: string }) {
  const { data, error, isLoading } = useSWR<Artist, Error>(
    `/api/spotify/artist/${props.id}`,
    swrFetcher
  );

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>Artist Loading...</div>;
  if (!data) return <div>No artist...</div>;

  const { name, externalUrl, images } = convertArtistData(data);

  return (
    <div>
      <MeidaPreview
        title={name}
        imageUrl={images[0]?.url ?? ''}
        externalUrl={externalUrl}
        type={MediaType.Artist}
      />
      <div className='mt-5'>
        <button className='rounded-md bg-white text-black p-2'>
          Save Changes
        </button>
      </div>
    </div>
  );
}
