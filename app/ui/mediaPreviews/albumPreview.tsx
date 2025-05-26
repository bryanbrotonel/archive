import { MediaType } from '@/app/lib/types';
import useSWR from 'swr';
import { Album } from '@spotify/web-api-ts-sdk';
import { convertAlbumData, swrFetcher } from '@/app/lib/utils';
import MediaPreview from './mediaPreview';
import { onSaveAlbum } from './api';

export default function AlbumPreview(props: { id: string }) {
  const { data, error, isLoading } = useSWR<Album, Error>(
    `/api/spotify/album/${props.id}`,
    swrFetcher,
    { revalidateOnFocus: false }
  );

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>Album Loading...</div>;
  if (!data) return <div>No album...</div>;

  const {
    name,
    artist,
    imageUrl,
    externalUrls: { spotify },
  } = convertAlbumData(data);
  return (
    <div>
      <MediaPreview
        title={name}
        subTitle={artist}
        imageUrl={imageUrl}
        externalUrl={spotify || ''}
        type={MediaType.Album}
      />
      <div className='mt-5'>
        <button
          onClick={() => onSaveAlbum(data)}
          className='rounded-md bg-white text-black p-2'
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
