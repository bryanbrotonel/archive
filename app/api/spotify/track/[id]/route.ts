import { NextResponse } from 'next/server';
import { getTrack } from '@/app/lib/api/spotify';
import { spotifyApiError } from '@/app/lib/types';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
): Promise<NextResponse<object | spotifyApiError>> {

  const { id } = params

  try {
    const response = await getTrack(id)

    const data = await response.json()

    if (response.status !== 200) {
      throw data.error
    }

    return NextResponse.json(data)

  } catch (error) {
    console.error('~ Fetch track failed:', error);
    return NextResponse.json({ error })
  }
}