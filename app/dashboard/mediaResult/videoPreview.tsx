import useSWR from 'swr';
import { getYouTubeVideoId } from '@/app/lib/api/youtube';
import { MediaType, VideoInput } from '@/app/lib/types';
import { convertVideoData, swrFetcher } from '@/app/lib/utils';
import MeidaPreview from '../mediaPreview';

export default function VideoPreview(props: { url: string }) {
  const videoId = getYouTubeVideoId(props.url);
  const { data, error, isLoading } = useSWR<object>(
    `/api/youtube/video/${videoId}`,
    swrFetcher
  );

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>Video Loading...</div>;
  if (!data) return <div>No video...</div>;

  const { title, channelTitle, thumbnailUrl, videoUrl } = convertVideoData(
    data as VideoInput
  );

  return (
    <div>
      <MeidaPreview
        title={title}
        subTitle={channelTitle}
        imageUrl={thumbnailUrl}
        externalUrl={videoUrl}
        type={MediaType.Video}
      />
      <div className='mt-5'>
        <button className='rounded-md bg-white text-black p-2'>
          Save Changes
        </button>
      </div>
    </div>
  );
}
