import { NextResponse } from 'next/server';
import { getYouTubeVideo } from '@/app/lib/api/youtube';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
): Promise<NextResponse<object | { error: unknown }>> {

  const { id } = params

  try {
    const response = await getYouTubeVideo(id)

    const data = await response.json()

    if (response.status !== 200) {
      throw data.error
    }

    const videoData = data.items && data.items.length > 0 ? { id: data.items[0].id, ...data.items[0].snippet } : {}

    return NextResponse.json(videoData)

  } catch (error: unknown) {
    console.error('~ Fetch video failed:', error);
    return NextResponse.json({ error: error }, { status: 500 })
  }
}