import { NextResponse } from 'next/server';
import { searchForItem } from '@/app/lib/api/spotify';
import { SearchResults } from '@spotify/web-api-ts-sdk';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ query: string }> }
): Promise<
  NextResponse<SearchResults<['album', 'artist', 'track']> | { error: unknown }>
> {
  const { query } = await params;

  try {
    const response = await searchForItem(query);

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
