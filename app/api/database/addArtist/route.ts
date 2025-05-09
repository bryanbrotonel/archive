import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request
): Promise<NextResponse<{ message: string } | { error: unknown }>> {
  const { id, name, externalUrls, genres, imageUrl } = await request.json();
  const client = await db.connect();

  try {
    await client.sql`
      INSERT INTO artist (id, name, image_url, genres, external_urls)
      VALUES (
        ${id}, 
        ${name}, 
        ${imageUrl}, 
        ${JSON.stringify(genres)}, 
        ${JSON.stringify(externalUrls)}
      )
      ON CONFLICT (id) DO NOTHING;
    `;

    return NextResponse.json({ message: 'Artist inserted successfully!' });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    client.release();
  }
}
