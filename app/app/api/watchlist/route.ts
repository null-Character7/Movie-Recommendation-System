import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// POST endpoint to add a movie to the user's watchlist
export async function POST(req: NextRequest) {
    const { userId, movieId } = await req.json();

    try {
        // Check if the movie exists in the database
        const movie = await prisma.movie.findUnique({
            where: { id: movieId },
        });

        if (!movie) {
            return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
        }

        // Add the movie to the user's watchlist
        const watchlistEntry = await prisma.watchlist.create({
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


// GET endpoint to retrieve a user's watchlist
export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    const { userId } = params;

    try {
        // Fetch the user's watchlist from the database
        const watchlist = await prisma.watchlist.findMany({
            where: { userId: parseInt(userId) },
            include: {
                movie: true, // This will fetch movie details along with the watchlist entry
            },
        });

        return NextResponse.json(watchlist, { status: 200 });
    } catch (error) {
        console.error('Error retrieving watchlist: ', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
