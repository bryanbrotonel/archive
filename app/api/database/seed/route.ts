import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const client = await db.connect();

  try {
    const databaseSchema = `
      CREATE TABLE IF NOT EXISTS artist (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image_url TEXT,
        genres JSONB,
        external_urls JSONB,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS album ( 
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        artist VARCHAR(255) NOT NULL,
        image_url TEXT,
        release_date TIMESTAMP,
        external_urls JSONB,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS track (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        artist VARCHAR(255) NOT NULL,
        preview_url TEXT,
        image_url TEXT,
        external_urls JSONB,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS video (
        id VARCHAR(255) PRIMARY KEY,
        video_title VARCHAR(255) NOT NULL,
        channel_id VARCHAR(255),
        channel_title VARCHAR(255),
        thumbnail_url TEXT,
        external_urls JSONB,
        published_at TIMESTAMP,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `;

    const seedData = `
      INSERT INTO artists (id, name, image_url, genres, external_urls)
      VALUES 
        ('artist1', 'The Weeknd', 'https://i.scdn.co/image/ab6761610000e5eb0a7388b95df960b5c0da8970', 
         '["pop", "r&b"]'::jsonb, 
         '{"spotify": "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ"}'::jsonb)
      ON CONFLICT (id) DO NOTHING;

      INSERT INTO albums (id, name, artist, image_url, genres, external_urls)
      VALUES 
        ('album1', 'After Hours', 'artist1', 'https://i.scdn.co/image/ab67616d00001e02b1c4b76e23414c9f20242268',
         '["pop", "synthwave"]'::jsonb,
         '{"spotify": "https://open.spotify.com/album/4yP0hdKOZPNshxUOjY0cZj"}'::jsonb)
      ON CONFLICT (id) DO NOTHING;

      INSERT INTO tracks (id, name, artist, preview_url, image_url, genres, external_urls)
      VALUES 
        ('track1', 'Blinding Lights', 'artist1', 'https://p.scdn.co/mp3-preview/123',
         'https://i.scdn.co/image/ab67616d00001e02b1c4b76e23414c9f20242268',
         '["pop", "synthwave"]'::jsonb,
         '{"spotify": "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b"}'::jsonb)
      ON CONFLICT (id) DO NOTHING;

      INSERT INTO videos (id, video_title, channel_id, channel_title, thumbnail_url, external_urls, published_at)
      VALUES 
        ('video1', 'The Weeknd - Blinding Lights (Official Video)', 'UC0WP5P-ufpRfjbNrmOWwLBQ',
         'The Weeknd', 'https://i.ytimg.com/vi/4NRXx6U8ABQ/maxresdefault.jpg',
         '{"youtube": "https://www.youtube.com/watch?v=4NRXx6U8ABQ"}'::jsonb,
         '2020-01-21T00:00:00Z')
      ON CONFLICT (id) DO NOTHING;
    `;

    // Create tables
    await client.query(databaseSchema);

    // Seed data
    await client.query(seedData);

    return NextResponse.json({ message: 'Tables created and data inserted successfully' });
  } catch (error) {
    console.error('Error creating tables or inserting data:', error);
    return NextResponse.json({ error: 'Failed to create tables or insert data' }, { status: 500 });
  } finally {
    client.release();
  }
}
