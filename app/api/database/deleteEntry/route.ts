import { MediaType } from '@/app/lib/types';
import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request
): Promise<NextResponse<{ message: string } | { error: unknown }>> {
  const { entryID, entryType }: { entryID: string; entryType: MediaType } = await request.json();

  const client = await db.connect();

  try {
    const tableMap: Record<MediaType, { tableName: string; responseMessage: string }> = {
      [MediaType.Album]: { tableName: 'album', responseMessage: 'Album deleted successfully!' },
      [MediaType.Track]: { tableName: 'track', responseMessage: 'Track deleted successfully!' },
      [MediaType.Video]: { tableName: 'video', responseMessage: 'Video deleted successfully!' },
      [MediaType.Artist]: { tableName: 'artist', responseMessage: 'Artist deleted successfully!' },
    };

    const entryData = tableMap[entryType];

    if (!entryData) {
      return NextResponse.json({ error: 'Invalid entry type' }, { status: 400 });
    }

    const { tableName, responseMessage } = entryData;

    await client.query(`DELETE FROM ${tableName} WHERE id='${entryID}';`);


    return NextResponse.json({ message: responseMessage });
  } catch (error) {
    console.log('🚀 ~ error:', error)
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    client.release();
  }
}