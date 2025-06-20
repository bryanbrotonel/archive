import { NextResponse } from 'next/server';
import { getAlbum } from '@/app/lib/api/spotify';

export async function GET(
  request: Request,
): Promise<NextResponse<object | { error: unknown }>> {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing album id' }, { status: 400 });
    }

    const response = await getAlbum(id);
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