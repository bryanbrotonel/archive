import { useMemo } from 'react';
import useSWR from 'swr';
import { getYouTubeVideoId } from '@/app/lib/api/youtube';
import { ConvertedVideo, MediaType, VideoInput } from '@/app/lib/types';
import { convertVideoData, swrFetcher } from '@/app/lib/utils';
import MediaPreview from '../mediaPreview';

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

  const onSave = async (convertedData: ConvertedVideo) => {
    const {
      id,
      title,
      channelId,
      channelTitle,
      thumbnailUrl,
      videoUrl,
      publishedAt,
    } = convertedData;

    const saveData = {
      videoID: id,
      videoTitle: title,
      channelID: channelId,
      channelTitle: channelTitle,
      thumbnailUrl: thumbnailUrl,
      videoUrl: videoUrl,
      publishedAt: publishedAt,
    };

    try {
      const response = await fetch(`/api/database/addVideo`, {
        method: 'POST',
        body: JSON.stringify(saveData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to save video');
      }

      console.log('Save successful');
    } catch (error) {
      console.error('Error saving video:', error);
    }
  };

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
          onClick={() => onSave(convertedData)}
          className='rounded-md bg-white text-black p-2'
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
