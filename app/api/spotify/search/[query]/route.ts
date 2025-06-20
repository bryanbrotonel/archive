import { NextResponse } from 'next/server';
import { searchForItem } from '@/app/lib/api/spotify';
import { SearchResults } from '@spotify/web-api-ts-sdk';

export async function GET(
  request: Request
): Promise<
  NextResponse<SearchResults<['album', 'artist', 'track']> | { error: unknown }>
> {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json(
      { error: 'Missing query parameter' },
      { status: 400 }
    );
  }

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
