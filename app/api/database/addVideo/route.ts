import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request
): Promise<NextResponse<{ message: string } | { error: unknown }>> {
  const {
    videoID,
    videoTitle,
    external_urls,
    channelID,
    channelTitle,
    thumbnailUrl,
    publishedAt,
  } = await request.json();

  const client = await db.connect();

  try {
    await client.sql`
      INSERT INTO video (
        id, 
        video_title, 
        channel_id, 
        channel_title, 
        thumbnail_url, 
        external_urls, 
        published_at
      )
      VALUES 
      (
        ${videoID}, 
        ${videoTitle}, 
        ${channelID}, 
        ${channelTitle}, 
        ${thumbnailUrl}, 
        ${JSON.stringify(external_urls)}::jsonb, 
        ${publishedAt}
      )
      ON CONFLICT (id) DO NOTHING;
    `;

    return NextResponse.json({ message: 'Video inserted successfully!' });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    client.release();
  }
}
