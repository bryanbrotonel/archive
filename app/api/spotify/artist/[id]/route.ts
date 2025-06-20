import { NextResponse } from 'next/server';
import { getArtist } from '@/app/lib/api/spotify';
import { Artist } from '@spotify/web-api-ts-sdk';

export async function GET(
  request: Request,
): Promise<NextResponse<Artist | { error: unknown }>> {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json({ error: 'Missing artist id' }, { status: 400 });
    }

    const response = await getArtist(id);
    const data = await response.json();

    if (response.status !== 200) {
      throw data.error;
    }

    return NextResponse.json(data);

  } catch (error: unknown) {
    console.error('~ Fetch artist failed:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}