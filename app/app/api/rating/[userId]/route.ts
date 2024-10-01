// pages/api/ratings/[userId].ts
import { NextRequest, NextResponse } from 'next/server';
import { prismaClient } from '@/app/lib/db';

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  const { userId } = params; // Extract the userId from the URL

  try {
    // Fetch all ratings made by the user, including movie details
    const ratings = await prismaClient.rating.findMany({
      where: { userId: userId }, // Match ratings by the userId
      include: {
        movie: {
          select: { 
            title: true, 
            posterUrl: true 
          }, // Include movie title and poster in the response
        },
      },
    });

    if (ratings.length === 0) {
      return NextResponse.json({ message: 'No ratings found for this user' }, { status: 200 });
    }

    // Map the response to the desired format
    const userRatings = ratings.map(rating => ({
      id: rating.movieId, // Movie ID
      title: rating.movie.title, // Movie title
      poster: rating.movie.posterUrl, // Movie poster URL
      rating: rating.rating, // User's rating for the movie
    }));

    return NextResponse.json(userRatings, { status: 200 });
  } catch (error) {
    console.error('Error fetching user ratings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
