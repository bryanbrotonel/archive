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
  const order = searchParams.get('order') || 'latest';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '20', 10);
  const searchQuery = searchParams.get('query') || '';

  let table: string;
  let searchColumns: string[];

  switch (type) {
    case MediaType.Artist:
      table = 'artist';
      searchColumns = ['name'];
      break;
    case MediaType.Album:
      table = 'album';
      searchColumns = ['name', 'artist'];
      break;
    case MediaType.Track:
      table = 'track';
      searchColumns = ['name', 'artist'];
      break;
    case MediaType.Video:
      table = 'video';
      searchColumns = ['video_title', 'channel_title'];
      break;
    default:
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  }

  const client = await db.connect();

  try {
    const offset = (page - 1) * limit;
    let query = `SELECT * FROM ${table}`;
    let countQuery = `SELECT COUNT(*) FROM ${table}`;
    const params: (string | number)[] = [];
    const whereClauses: string[] = [];

    // Add search condition if query exists
    if (searchQuery) {
      searchColumns.forEach((col, idx) => {
        whereClauses.push(`${col} ILIKE $${idx + 1}`);
        params.push(`%${searchQuery}%`);
      });
      const whereClause = whereClauses.join(' OR ');
      query += ` WHERE ${whereClause}`;
      countQuery += ` WHERE ${whereClause}`;
    }

    // Add ordering
    if (order === 'latest') {
      query += ` ORDER BY created_at DESC`;
    }

    // Add pagination
    query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const result = await client.query(query, params);
    const countParams = searchQuery
      ? params.slice(0, searchColumns.length)
      : [];
    const countResult = await client.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count, 10);

    return NextResponse.json({ data: result.rows, total });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    client.release();
  }
}
