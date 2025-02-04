import useSWR from 'swr';
import { MediaType } from '@/app/lib/types';
import { Artist } from '@spotify/web-api-ts-sdk';
import { convertArtistData, swrFetcher } from '@/app/lib/utils';
import MediaPreview from '../mediaPreview';

export default function ArtistPreview({ id }: { id: string }) {
  const { data, error, isLoading } = useSWR<Artist, Error>(
    id ? `/api/spotify/artist/${id}` : null,
    swrFetcher,
    { revalidateOnFocus: false }
  );

  const onSave = async (data: Artist) => {
    const saveData = {
      id: data?.id,
      name: data?.name,
      externalUrls: data?.external_urls,
      genres: data?.genres,
      imageUrl: data?.images[0]?.url,
    };

    try {
      const response = await fetch(`/api/database/addArtist`, {
        method: 'POST',
        body: JSON.stringify(saveData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to save artist');
      }

      console.log('Save successful');
    } catch (error) {
      console.error('Error saving artist:', error);
    }
  };

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>Artist Loading...</div>;
  if (!data) return <div>No artist...</div>;

  const { name, externalUrl, images } = convertArtistData(data);

  return (
    <div>
      <MediaPreview
        title={name}
        imageUrl={images[0]?.url ?? ''}
        externalUrl={externalUrl}
        type={MediaType.Artist}
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
