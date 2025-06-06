import { MediaType } from '@/app/lib/types';
import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest
): Promise<
  NextResponse<{ data: object[]; total: number } | { error: unknown }>
> {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') as MediaType;
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '20', 10);
  const order = searchParams.get('order') || 'default';
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
    const offset = (page - 1) * limit;
    let query = `SELECT * FROM ${table}`;
    if (order === 'latest') {
      query += ` ORDER BY created_at DESC`;
    }
    query += ` LIMIT $1 OFFSET $2`;

    const result = await client.query(query, [limit, offset]);

    const countResult = await client.query(`SELECT COUNT(*) FROM ${table}`);
    const total = parseInt(countResult.rows[0].count, 10);

    return NextResponse.json({ data: result.rows, total });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    client.release();
  }
}
