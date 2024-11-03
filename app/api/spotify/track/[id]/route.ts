import { NextResponse } from 'next/server';
import { getTrack } from '@/app/lib/api/spotify';
import { Track } from '@spotify/web-api-ts-sdk';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
): Promise<NextResponse<Track | { error: unknown }>> {

  const { id } = params

  try {
    const response = await getTrack(id)

    const data = await response.json()

    if (response.status !== 200) {
      throw data.error
    }

    return NextResponse.json(data)

  } catch (error: unknown) {
    console.error('~ Fetch track failed:', error);
    return NextResponse.json({ error: error }, { status: 500 })
  }
}