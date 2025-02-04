import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request
): Promise<NextResponse<{ message: string } | { error: unknown }>> {

  const { id, name, trackNumber, previewUrl, externalUrls, genres, imageUrl } = await request.json();

  const client = await db.connect();

  try {
    await client.sql`
      INSERT INTO tracks (id, name, tracknumber, externalurls, previewurl, genres, imageurl, createdAt, updatedAt)
      VALUES (
        ${id},
        ${name},
        ${trackNumber},
        ${JSON.stringify(externalUrls)},
        ${previewUrl},
        ${JSON.stringify(genres)},
        ${imageUrl},
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
      );
    `;

    return NextResponse.json({ message: 'Track inserted successfully!' });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    client.release();
  }
}
