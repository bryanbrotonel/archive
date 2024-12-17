import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  params: {
    id: string,
    name: string;
    externalUrls: Record<string, string>; // JSON object, e.g., { spotify: "url" }
    genres: string[]; // Array of strings, e.g., ["Pop", "Country"]
    imageUrl: string;
  }
): Promise<NextResponse<{ message: string } | { error: unknown }>> {
  console.log('calling get')

  const { id, name, externalUrls, genres, imageUrl } = params

  const client = await db.connect();

  try {
    await client.sql`
      INSERT INTO artists (id, name, externalUrls, genres, imageUrl, createdAt, updatedAt)
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