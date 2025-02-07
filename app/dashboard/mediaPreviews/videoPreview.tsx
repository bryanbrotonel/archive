import { useMemo } from 'react';
import useSWR from 'swr';
import { getYouTubeVideoId } from '@/app/lib/api/youtube';
import { MediaType, VideoInput } from '@/app/lib/types';
import { convertVideoData, swrFetcher } from '@/app/lib/utils';
import MediaPreview from './mediaPreview';
import { onSaveVideo } from './api';

export default function VideoPreview({ url }: { url: string }) {
  const videoId = getYouTubeVideoId(url);
  const { data, error, isLoading } = useSWR<VideoInput>(
    `/api/youtube/video/${videoId}`,
    swrFetcher
  );

  const convertedData = useMemo(() => {
    if (!data) return null;
    return convertVideoData(data);
  }, [data]);


  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>Video Loading...</div>;
  if (!convertedData) return <div>No video...</div>;

  const { title, channelTitle, thumbnailUrl, videoUrl } = convertedData;

  return (
    <div>
      <MediaPreview
        title={title}
        subTitle={channelTitle}
        imageUrl={thumbnailUrl}
        externalUrl={videoUrl}
        type={MediaType.Video}
      />
      <div className='mt-5'>
        <button
          onClick={() => onSaveVideo(convertedData)}
          className='rounded-md bg-white text-black p-2'
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
