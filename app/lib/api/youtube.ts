
const YOUTUBE_VIDEO_ENDPOINT = (id: string) => `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${process.env.YOUTUBE_API_TOKEN}&part=snippet`;

const YOUTUBE_URL_REGEX = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(?:-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/;

export const getYouTubeVideo = async (videoId: string): Promise<Response> => {
  return fetch(YOUTUBE_VIDEO_ENDPOINT(videoId), {
    method: "GET",
    cache: 'no-store',
  });
};
export const isYouTubeUrl = (url: string): boolean => {
  return YOUTUBE_URL_REGEX.test(url);
};

export const getYouTubeVideoId = (url: string): string | null => {
  const match = url.match(YOUTUBE_URL_REGEX);
  return match ? match[5] : null;
}