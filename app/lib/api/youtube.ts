const { YOUTUBE_API_TOKEN } =
  process.env;

export const fetchYouTubeVideoData = async (videoId: string): Promise<any | null> => {
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YOUTUBE_API_TOKEN}&part=snippet`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.items && data.items.length > 0) {

      return data.items[0].snippet
    } else {
      console.log('Video not found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching YouTube data', error);
    return null;
  }
};

const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};
