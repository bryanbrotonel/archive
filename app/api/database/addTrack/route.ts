import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request
): Promise<NextResponse<{ message: string } | { error: unknown }>> {
  const { id, name, artist, previewUrl, externalUrls, imageUrl } = await request.json();

  const client = await db.connect();

  try {
    await client.sql`
      INSERT INTO track (
        id, 
        name, 
        artist, 
        preview_url, 
        image_url, 
        external_urls
      )
      VALUES (
        ${id}, 
        ${name}, 
        ${artist}, 
        ${previewUrl}, 
        ${imageUrl}, 
        ${JSON.stringify(externalUrls)}
      )
      ON CONFLICT (id) DO UPDATE 
      SET 
        name = EXCLUDED.name,
        artist = EXCLUDED.artist,
        preview_url = EXCLUDED.preview_url,
        image_url = EXCLUDED.image_url,
        external_urls = EXCLUDED.external_urls,
        updated_at = NOW();
    `;

    return NextResponse.json({ message: 'Track inserted successfully!' });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    client.release();
  }
}
