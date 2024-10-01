import { prismaClient } from '@/app/lib/db';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';


interface Cast {
  name: string;
  image: string;
  character: string;
}

interface Movie {
  ttid: string;
  title: string;
  posterUrl: string;
  releaseYear: number;
  overview: string;
  genres:string[];
  cast: Cast[];
}

// POST API to add a movie if it doesn't exist
export async function POST(req: NextRequest) {
  try {
    const { ttid, title, posterUrl, releaseYear, overview, cast, genres }: Movie = await req.json();
    console.log("cast is ",cast)
    console.log("genres are ",genres)

    // Check if the movie already exists
    const existingMovie = await prismaClient.movie.findUnique({
      where: { ttid },
    });

    // If the movie exists, return a message
    if (existingMovie) {
      return NextResponse.json({ message: 'Movie already exists in the database.' }, { status: 200 });
    }

    // If the movie doesn't exist, create a new one
    const newMovie = await prismaClient.movie.create({
      data: {
        ttid,
        title,
        posterUrl,
        releaseYear,
        description: overview,
        genre: genres,
        cast: cast ? JSON.stringify(cast) : Prisma.DbNull, // Use Prisma.DbNull for null JSON values
      },
    });

    return NextResponse.json(newMovie, { status: 201 });
  } catch (error) {
    console.error('Error creating movie:', error);
    return NextResponse.json({ error: 'Error creating movie' }, { status: 500 });
  }
}
