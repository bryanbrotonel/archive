import { NextResponse } from 'next/server';
import { getYouTubeVideo } from '@/app/lib/api/youtube';
import { ResponseError } from '@/app/interfaces';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
): Promise<NextResponse<object | ResponseError>> {

  const { id } = params

  try {
    const response = await getYouTubeVideo(id)

    const data = await response.json()

    if (response.status !== 200) {
      throw data.error
    }

    let videoData = data.items && data.items.length > 0 ? { id: data.items[0].id, ...data.items[0].snippet } : {}

    return NextResponse.json(videoData)

  } catch (error) {
    console.error('~ Fetch video failed:', error);
    return NextResponse.json({ error })
  }
}