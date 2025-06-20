import { NextResponse } from 'next/server';
import { getYouTubeVideo } from '@/app/lib/api/youtube';
import { VideoInput } from '@/app/lib/types';

export async function GET(
  request: Request
): Promise<NextResponse<VideoInput | { error: unknown }>> {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing video id' }, { status: 400 });
    }

    const response = await getYouTubeVideo(id);
    const data = await response.json();

    if (response.status !== 200) {
      throw data.error;
    }

    const videoData =
      data.items && data.items.length > 0
        ? { id: data.items[0].id, ...data.items[0].snippet }
        : {};

    return NextResponse.json(videoData);
  } catch (error: unknown) {
    console.error('~ Fetch video failed:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
