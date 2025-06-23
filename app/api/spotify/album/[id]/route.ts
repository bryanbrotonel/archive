import { NextResponse } from 'next/server';
import { getAlbum } from '@/app/lib/api/spotify';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<object | { error: unknown }>> {
  const { id } = await params;

  try {
    const response = await getAlbum(id);

    const data = await response.json();

    if (response.status !== 200) {
      throw data.error;
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error('~ Fetch album failed:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
