import { NextResponse } from 'next/server';
import { getTrack } from '@/app/lib/api/spotify';
import { Track } from '@spotify/web-api-ts-sdk';

export async function GET(
  request: Request
): Promise<NextResponse<Track | { error: unknown }>> {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing track id' }, { status: 400 });
  }

  try {
    const response = await getTrack(id);
    const data = await response.json();

    if (response.status !== 200) {
      throw data.error;
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error('~ Fetch track failed:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
