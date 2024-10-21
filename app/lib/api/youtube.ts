
const YOUTUBE_VIDEO_ENDPOINT = (id: string) => `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${process.env.YOUTUBE_API_TOKEN}&part=snippet`;

export const getYouTubeVideo = async (videoId: string): Promise<Response> => {
  return fetch(YOUTUBE_VIDEO_ENDPOINT(videoId), {
    method: "GET",
    cache: 'no-store',
  });
};

export const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

