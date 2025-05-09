import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request
): Promise<NextResponse<{ message: string } | { error: unknown }>> {
  const {
    id,
    name,
    artist,
    externalUrls,
    imageUrl,
  } = await request.json();

  const client = await db.connect();

  try {
    await client.sql`
      INSERT INTO album (id, name, artist, image_url, external_urls)
      VALUES 
      (${id}, ${name}, ${artist}, ${imageUrl}, ${externalUrls}::jsonb)
      ON CONFLICT (id) DO NOTHING;
    `;

    return NextResponse.json({ message: 'Album inserted successfully!' });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    client.release();
  }
}
