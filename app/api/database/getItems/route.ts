import { MediaType } from '@/app/lib/types';
import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest
): Promise<NextResponse<{ data: any[] } | { error: unknown }>> {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') as MediaType;
  let table;

  switch (type) {
    case MediaType.Artist:
      table = 'artist';
      break;
    case MediaType.Album:
      table = 'album';
      break;
    case MediaType.Track:
      table = 'track';
      break;
    case MediaType.Video:
      table = 'video';
      break;
    default:
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  }

  const client = await db.connect();

  try {
    const query = `SELECT * FROM ${table}`;
    const result = await client.query(query);
    console.log('🚀 ~ result:', result)

    return NextResponse.json({ data: result.rows });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    client.release();
  }
}
