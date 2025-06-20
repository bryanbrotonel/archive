import { useMemo } from 'react';
import useSWR from 'swr';
import { useToast } from '@/app/hooks/toast-povider';
import { MediaType, VideoInput } from '@/app/lib/types';
import { convertVideoData, swrFetcher } from '@/app/lib/utils';
import MediaPreview from './mediaPreview';
import { onSaveVideo } from './api';

export default function VideoPreview({ id }: { id: string }) {
  const { showToast } = useToast();

  const { data, error, isLoading } = useSWR<VideoInput>(
    `/api/youtube/video/${id}`,
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
          onClick={async () => {
            try {
              await onSaveVideo(convertedData);
              showToast({ message: 'Video Saved', type: 'success' });
            } catch (error) {
              console.error('Error saving video:', error);
              showToast({ message: 'Failed to save video', type: 'error' });
            }
          }}
          className='rounded-md bg-white text-black p-2'
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
