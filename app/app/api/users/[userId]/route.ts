import { NextRequest, NextResponse } from 'next/server';

// URL to your FastAPI server
const BASE_URL = 'http://localhost:8000/api/users/';

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  const { userId } = params;

  try {
    const res = await fetch(`${BASE_URL}${userId}/recommendations`, {
      method: 'GET',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch user recommendations');
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
