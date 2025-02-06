import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request
): Promise<NextResponse<{ message: string } | { error: unknown }>> {

  const { videoID, videoTitle, videoUrl, channelID, channelTitle, thumbnailUrl, publishedAt, } = await request.json();

  const client = await db.connect();

  try {
    await client.sql`
      INSERT INTO video (videoid, videotitle, videoUrl, channelid, channeltitle, thumbnailurl, publishedat, createdat, updatedat)
      VALUES (
        ${videoID},
        ${videoTitle},
        ${videoUrl},
        ${channelID},
        ${channelTitle},
        ${thumbnailUrl},
        ${publishedAt},
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
      );
    `;

    return NextResponse.json({ message: 'Video inserted successfully!' });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    client.release();
  }
}
