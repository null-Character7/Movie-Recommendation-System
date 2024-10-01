import { NextRequest, NextResponse } from 'next/server';
import { prismaClient } from '@/app/lib/db';



// POST endpoint to add a movie to the user's watchlist
export async function POST(req: NextRequest) {
    const { userId, movieId } = await req.json();

    try {
        // Check if the movie exists in the database
        const movie = await prismaClient.movie.findUnique({
            where: { ttid: movieId },
        });

        if (!movie) {
            return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
        }

        // Add the movie to the user's watchlist
        const watchlistEntry = await prismaClient.watchlist.create({
            data: {
                userId,
                movieId,
            },
        });

        return NextResponse.json(watchlistEntry, { status: 201 });
    } catch (error) {
        console.error('Error adding to watchlist: ', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}



