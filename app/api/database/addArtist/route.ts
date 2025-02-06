import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request
): Promise<NextResponse<{ message: string } | { error: unknown }>> {

  const { id, name, externalUrls, genres, imageUrl } = await request.json();

  const client = await db.connect();

  try {
    await client.sql`
      INSERT INTO artist (id, name, externalUrls, genres, imageUrl, createdAt, updatedAt)
      VALUES (
        ${id},
        ${name},
        ${JSON.stringify(externalUrls)},
        ${JSON.stringify(genres)},
        ${imageUrl},
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
      );
    `;

    return NextResponse.json({ message: 'Artist inserted successfully!' });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    client.release();
  }
}
