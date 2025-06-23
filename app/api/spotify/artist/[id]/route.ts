import { NextResponse } from 'next/server';
import { getArtist } from '@/app/lib/api/spotify';
import { Artist } from '@spotify/web-api-ts-sdk';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<Artist | { error: unknown }>> {
  const { id } = await params;

  try {
    const response = await getArtist(id);

    const data = await response.json();

    if (response.status !== 200) {
      throw data.error;
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error('~ Fetch album failed:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
