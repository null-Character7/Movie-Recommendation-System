import { NextRequest, NextResponse } from 'next/server';

// URL to your FastAPI server (assuming it is running locally on port 8000)
const BASE_URL = 'http://localhost:8000/api/movies/';

export async function GET(req: NextRequest, { params }: { params: { movieId: string } }) {
  const { movieId } = params;

  try {
    const res = await fetch(`${BASE_URL}${movieId}/similar`, {
      method: 'GET',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch similar movies');
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return NextResponse.json(
        { message: 'Internal server error'},
        { status: 400 }
      );
  }
}
